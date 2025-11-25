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
const API_URL = process.env.API_URL || 'http://127.0.0.1:3001';
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('🚀 Starting Dashboard & Product Verification...');
        // 1. Login as Admin
        console.log('\n1. Logging in as Admin...');
        const loginRes = yield fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'admin@loomspace.com', password: 'password123' }),
        });
        if (!loginRes.ok)
            throw new Error(`Login failed: ${loginRes.statusText}`);
        const { token } = yield loginRes.json();
        console.log('✅ Admin logged in.');
        // 2. Get Initial Dashboard Stats
        console.log('\n2. Fetching Initial Dashboard Stats...');
        const statsRes = yield fetch(`${API_URL}/admin/dashboard`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const initialStats = yield statsRes.json();
        console.log(`✅ Initial Stats: Orders=${initialStats.totalOrders}, Products=${initialStats.totalProducts}`);
        // 3. Create New Product
        console.log('\n3. Creating New Product...');
        const newProduct = {
            name: 'Test Product ' + Date.now(),
            description: 'A test product',
            price: 19.99,
            categoryId: '1', // Assuming category ID 1 exists from seed
            images: ['https://placehold.co/600x400']
        };
        // We need a valid category ID. Let's fetch one first.
        const catRes = yield fetch(`${API_URL}/categories`);
        const categories = yield catRes.json();
        if (categories.length > 0) {
            newProduct.categoryId = categories[0].id;
        }
        const createRes = yield fetch(`${API_URL}/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(newProduct)
        });
        if (!createRes.ok) {
            const err = yield createRes.text();
            throw new Error(`Create product failed: ${err}`);
        }
        const createdProduct = yield createRes.json();
        console.log(`✅ Product created: ${createdProduct.name} (${createdProduct.id})`);
        // 4. Verify Dashboard Stats Updated
        console.log('\n4. Verifying Dashboard Stats (Product Count)...');
        const statsRes2 = yield fetch(`${API_URL}/admin/dashboard`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const updatedStats = yield statsRes2.json();
        if (updatedStats.totalProducts !== initialStats.totalProducts + 1) {
            throw new Error(`Expected product count ${initialStats.totalProducts + 1}, got ${updatedStats.totalProducts}`);
        }
        console.log('✅ Product count increased correctly.');
        // 5. Update Product
        console.log('\n5. Updating Product...');
        const updateRes = yield fetch(`${API_URL}/products/${createdProduct.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ price: 25.00 })
        });
        if (!updateRes.ok)
            throw new Error('Update failed');
        const updatedProduct = yield updateRes.json();
        if (Number(updatedProduct.price) !== 25)
            throw new Error(`Price update not reflected: got ${updatedProduct.price}`);
        console.log('✅ Product updated.');
        // 6. Delete Product
        console.log('\n6. Deleting Product...');
        const deleteRes = yield fetch(`${API_URL}/products/${createdProduct.id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!deleteRes.ok)
            throw new Error('Delete failed');
        console.log('✅ Product deleted.');
        // 7. Verify Dashboard Stats Reverted
        console.log('\n7. Verifying Dashboard Stats (Reverted)...');
        const statsRes3 = yield fetch(`${API_URL}/admin/dashboard`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const finalStats = yield statsRes3.json();
        if (finalStats.totalProducts !== initialStats.totalProducts) {
            throw new Error(`Expected product count ${initialStats.totalProducts}, got ${finalStats.totalProducts}`);
        }
        console.log('✅ Product count reverted correctly.');
        console.log('\n🎉 ALL DASHBOARD & PRODUCT TESTS PASSED!');
    });
}
main().catch(e => {
    console.error('\n❌ TEST FAILED:', e);
    process.exit(1);
});
