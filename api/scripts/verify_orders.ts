
import { PrismaClient } from '@prisma/client';

export { }; // Make this file a module to avoid global scope conflicts
const API_URL = 'http://localhost:3001';

async function main() {
    console.log('🚀 Starting Order Verification...');

    // 1. Login as User
    console.log('\n1. Logging in as User...');
    const userLoginRes = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'user@loomspace.com', password: 'password123' }),
    });

    if (!userLoginRes.ok) {
        throw new Error(`User login failed: ${userLoginRes.statusText}`);
    }

    const userData = await userLoginRes.json();
    const userToken = userData.token;
    console.log('✅ User logged in.');

    // 2. Get a Product to buy
    console.log('\n2. Fetching products...');
    const productsRes = await fetch(`${API_URL}/products`);
    const products = await productsRes.json();
    if (products.length === 0) throw new Error('No products found');
    const product = products[0];
    console.log(`✅ Found product: ${product.name} ($${product.price})`);

    // 3. Create Order
    console.log('\n3. Creating Order...');
    const orderRes = await fetch(`${API_URL}/orders`, {
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
        const err = await orderRes.text();
        throw new Error(`Create order failed: ${err}`);
    }

    const order = await orderRes.json();
    console.log(`✅ Order created! ID: ${order.id}`);

    // 4. Verify Order in My Orders
    console.log('\n4. Verifying Order in User History...');
    const myOrdersRes = await fetch(`${API_URL}/orders/my-orders`, {
        headers: { 'Authorization': `Bearer ${userToken}` }
    });
    const myOrders = await myOrdersRes.json();
    const myOrder = myOrders.find((o: any) => o.id === order.id);

    if (!myOrder) throw new Error('Order not found in user history');
    if (myOrder.status !== 'PENDING') throw new Error(`Expected status PENDING, got ${myOrder.status}`);
    console.log('✅ Order verified in user history (PENDING).');

    // 5. Login as Admin
    console.log('\n5. Logging in as Admin...');
    const adminLoginRes = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'admin@loomspace.com', password: 'password123' }),
    });

    if (!adminLoginRes.ok) {
        throw new Error(`Admin login failed: ${adminLoginRes.statusText}`);
    }

    const adminData = await adminLoginRes.json();
    const adminToken = adminData.token;
    console.log('✅ Admin logged in.');

    // 6. Get All Orders (Admin)
    console.log('\n6. Fetching All Orders as Admin...');
    const allOrdersRes = await fetch(`${API_URL}/admin/orders`, {
        headers: { 'Authorization': `Bearer ${adminToken}` }
    });

    if (!allOrdersRes.ok) {
        const err = await allOrdersRes.text();
        throw new Error(`Fetch admin orders failed: ${err}`);
    }

    const allOrders = await allOrdersRes.json();
    const adminOrder = allOrders.find((o: any) => o.id === order.id);
    if (!adminOrder) throw new Error('Order not found in admin list');
    console.log('✅ Order found in admin list.');

    // 7. Update Order Status
    console.log('\n7. Updating Order Status to SHIPPED...');
    const updateRes = await fetch(`${API_URL}/admin/orders/${order.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${adminToken}`
        },
        body: JSON.stringify({ status: 'SHIPPED' })
    });

    if (!updateRes.ok) {
        const err = await updateRes.text();
        throw new Error(`Update status failed: ${err}`);
    }
    console.log('✅ Order status updated.');

    // 8. Verify Update as User
    console.log('\n8. Verifying Status Update as User...');
    const myOrdersRes2 = await fetch(`${API_URL}/orders/my-orders`, {
        headers: { 'Authorization': `Bearer ${userToken}` }
    });
    const myOrders2 = await myOrdersRes2.json();
    const myOrder2 = myOrders2.find((o: any) => o.id === order.id);

    if (myOrder2.status !== 'SHIPPED') throw new Error(`Expected status SHIPPED, got ${myOrder2.status}`);
    console.log('✅ Order status verified as SHIPPED for user.');

    console.log('\n🎉 ALL TESTS PASSED!');
}

main().catch(e => {
    console.error('\n❌ TEST FAILED:', e);
    process.exit(1);
});
