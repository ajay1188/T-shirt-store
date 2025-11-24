export { }; // Make this file a module to avoid global scope conflicts
const API_URL = process.env.API_URL || 'http://127.0.0.1:3001';

async function main() {
    console.log('🚀 Starting Dashboard & Product Verification...');

    // 1. Login as Admin
    console.log('\n1. Logging in as Admin...');
    const loginRes = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'admin@loomspace.com', password: 'password123' }),
    });

    if (!loginRes.ok) throw new Error(`Login failed: ${loginRes.statusText}`);
    const { token } = await loginRes.json();
    console.log('✅ Admin logged in.');

    // 2. Get Initial Dashboard Stats
    console.log('\n2. Fetching Initial Dashboard Stats...');
    const statsRes = await fetch(`${API_URL}/admin/dashboard`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    const initialStats = await statsRes.json();
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
    const catRes = await fetch(`${API_URL}/categories`);
    const categories = await catRes.json();
    if (categories.length > 0) {
        newProduct.categoryId = categories[0].id;
    }

    const createRes = await fetch(`${API_URL}/products`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newProduct)
    });

    if (!createRes.ok) {
        const err = await createRes.text();
        throw new Error(`Create product failed: ${err}`);
    }
    const createdProduct = await createRes.json();
    console.log(`✅ Product created: ${createdProduct.name} (${createdProduct.id})`);

    // 4. Verify Dashboard Stats Updated
    console.log('\n4. Verifying Dashboard Stats (Product Count)...');
    const statsRes2 = await fetch(`${API_URL}/admin/dashboard`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    const updatedStats = await statsRes2.json();

    if (updatedStats.totalProducts !== initialStats.totalProducts + 1) {
        throw new Error(`Expected product count ${initialStats.totalProducts + 1}, got ${updatedStats.totalProducts}`);
    }
    console.log('✅ Product count increased correctly.');

    // 5. Update Product
    console.log('\n5. Updating Product...');
    const updateRes = await fetch(`${API_URL}/products/${createdProduct.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ price: 25.00 })
    });

    if (!updateRes.ok) throw new Error('Update failed');
    const updatedProduct = await updateRes.json();
    if (Number(updatedProduct.price) !== 25) throw new Error(`Price update not reflected: got ${updatedProduct.price}`);
    console.log('✅ Product updated.');

    // 6. Delete Product
    console.log('\n6. Deleting Product...');
    const deleteRes = await fetch(`${API_URL}/products/${createdProduct.id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
    });

    if (!deleteRes.ok) throw new Error('Delete failed');
    console.log('✅ Product deleted.');

    // 7. Verify Dashboard Stats Reverted
    console.log('\n7. Verifying Dashboard Stats (Reverted)...');
    const statsRes3 = await fetch(`${API_URL}/admin/dashboard`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    const finalStats = await statsRes3.json();

    if (finalStats.totalProducts !== initialStats.totalProducts) {
        throw new Error(`Expected product count ${initialStats.totalProducts}, got ${finalStats.totalProducts}`);
    }
    console.log('✅ Product count reverted correctly.');

    console.log('\n🎉 ALL DASHBOARD & PRODUCT TESTS PASSED!');
}

main().catch(e => {
    console.error('\n❌ TEST FAILED:', e);
    process.exit(1);
});
