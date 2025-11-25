"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const API_URL = 'http://localhost:3001';
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('🚀 Starting Order Verification...');
        // 1. Login as User
        console.log('\n1. Logging in as User...');
        const userLoginRes = yield fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'user@loomspace.com', password: 'password123' }),
        });
        if (!userLoginRes.ok) {
            throw new Error(`User login failed: ${userLoginRes.statusText}`);
        }
        const userData = yield userLoginRes.json();
        const userToken = userData.token;
        console.log('✅ User logged in.');
        // 2. Get a Product to buy
        console.log('\n2. Fetching products...');
        const productsRes = yield fetch(`${API_URL}/products`);
        const products = yield productsRes.json();
        if (products.length === 0)
            throw new Error('No products found');
        const product = products[0];
        console.log(`✅ Found product: ${product.name} ($${product.price})`);
        // 3. Create Order
        console.log('\n3. Creating Order...');
        const orderRes = yield fetch(`${API_URL}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}`
            },
            body: JSON.stringify({
                items: [{ productId: product.id, quantity: 1, price: product.price }],
                shippingDetails: {
                    name: 'Test User',
                    address: '123 Test St',
                    city: 'Test City',
                    zip: '12345',
                    country: 'Test Country'
                }
            }),
        });
        if (!orderRes.ok) {
            const err = yield orderRes.text();
            throw new Error(`Create order failed: ${err}`);
        }
        const order = yield orderRes.json();
        console.log(`✅ Order created! ID: ${order.id}`);
        // 4. Verify Order in My Orders
        console.log('\n4. Verifying Order in User History...');
        const myOrdersRes = yield fetch(`${API_URL}/orders/my-orders`, {
            headers: { 'Authorization': `Bearer ${userToken}` }
        });
        const myOrders = yield myOrdersRes.json();
        const myOrder = myOrders.find((o) => o.id === order.id);
        if (!myOrder)
            throw new Error('Order not found in user history');
        if (myOrder.status !== 'PENDING')
            throw new Error(`Expected status PENDING, got ${myOrder.status}`);
        console.log('✅ Order verified in user history (PENDING).');
        // 5. Login as Admin
        console.log('\n5. Logging in as Admin...');
        const adminLoginRes = yield fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'admin@loomspace.com', password: 'password123' }),
        });
        if (!adminLoginRes.ok) {
            throw new Error(`Admin login failed: ${adminLoginRes.statusText}`);
        }
        const adminData = yield adminLoginRes.json();
        const adminToken = adminData.token;
        console.log('✅ Admin logged in.');
        // 6. Get All Orders (Admin)
        console.log('\n6. Fetching All Orders as Admin...');
        const allOrdersRes = yield fetch(`${API_URL}/admin/orders`, {
            headers: { 'Authorization': `Bearer ${adminToken}` }
        });
        if (!allOrdersRes.ok) {
            const err = yield allOrdersRes.text();
            throw new Error(`Fetch admin orders failed: ${err}`);
        }
        const allOrders = yield allOrdersRes.json();
        const adminOrder = allOrders.find((o) => o.id === order.id);
        if (!adminOrder)
            throw new Error('Order not found in admin list');
        console.log('✅ Order found in admin list.');
        // 7. Update Order Status
        console.log('\n7. Updating Order Status to SHIPPED...');
        const updateRes = yield fetch(`${API_URL}/admin/orders/${order.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${adminToken}`
            },
            body: JSON.stringify({ status: 'SHIPPED' })
        });
        if (!updateRes.ok) {
            const err = yield updateRes.text();
            throw new Error(`Update status failed: ${err}`);
        }
        console.log('✅ Order status updated.');
        // 8. Verify Update as User
        console.log('\n8. Verifying Status Update as User...');
        const myOrdersRes2 = yield fetch(`${API_URL}/orders/my-orders`, {
            headers: { 'Authorization': `Bearer ${userToken}` }
        });
        const myOrders2 = yield myOrdersRes2.json();
        const myOrder2 = myOrders2.find((o) => o.id === order.id);
        if (myOrder2.status !== 'SHIPPED')
            throw new Error(`Expected status SHIPPED, got ${myOrder2.status}`);
        console.log('✅ Order status verified as SHIPPED for user.');
        console.log('\n🎉 ALL TESTS PASSED!');
    });
}
main().catch(e => {
    console.error('\n❌ TEST FAILED:', e);
    process.exit(1);
});
