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
const API_URL = process.env.API_URL || 'http://127.0.0.1:3003';
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('🚀 Starting Category Verification...');
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
        // 2. Create Category
        console.log('\n2. Creating Category...');
        const newCategory = { name: 'Test Category ' + Date.now() };
        const createRes = yield fetch(`${API_URL}/categories`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(newCategory)
        });
        if (!createRes.ok) {
            const err = yield createRes.text();
            throw new Error(`Create category failed: ${err}`);
        }
        const createdCategory = yield createRes.json();
        console.log(`✅ Category created: ${createdCategory.name} (${createdCategory.id})`);
        // 3. Verify Category Exists
        console.log('\n3. Verifying Category Exists...');
        const listRes = yield fetch(`${API_URL}/categories`);
        const categories = yield listRes.json();
        const found = categories.find((c) => c.id === createdCategory.id);
        if (!found)
            throw new Error('Category not found in list');
        console.log('✅ Category found in list.');
        // 4. Update Category
        console.log('\n4. Updating Category...');
        const updateRes = yield fetch(`${API_URL}/categories/${createdCategory.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ name: 'Updated Category ' + Date.now() })
        });
        if (!updateRes.ok)
            throw new Error('Update failed');
        const updatedCategory = yield updateRes.json();
        if (updatedCategory.name === createdCategory.name)
            throw new Error('Name not updated');
        console.log('✅ Category updated.');
        // 5. Delete Category
        console.log('\n5. Deleting Category...');
        const deleteRes = yield fetch(`${API_URL}/categories/${createdCategory.id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!deleteRes.ok)
            throw new Error('Delete failed');
        console.log('✅ Category deleted.');
        // 6. Verify Category Deleted
        console.log('\n6. Verifying Category Deleted...');
        const listRes2 = yield fetch(`${API_URL}/categories`);
        const categories2 = yield listRes2.json();
        const found2 = categories2.find((c) => c.id === createdCategory.id);
        if (found2)
            throw new Error('Category still exists in list');
        console.log('✅ Category gone from list.');
        console.log('\n🎉 ALL CATEGORY TESTS PASSED!');
    });
}
main().catch(e => {
    console.error('\n❌ TEST FAILED:', e);
    process.exit(1);
});
