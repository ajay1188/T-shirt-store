
import { useEffect, useState } from 'react';
import api from '../lib/api';
import { Plus, Trash2, Edit, Search, Filter, Package } from 'lucide-react';
import ProductForm from '../components/ProductForm';

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    categoryId: string;
    images: string[];
    category: { name: string };
}

export default function Products() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await api.get('/products');
            setProducts(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleAdd = () => {
        setSelectedProduct(undefined);
        setShowForm(true);
    };

    const handleEdit = (product: Product) => {
        setSelectedProduct(product);
        setShowForm(true);
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await api.delete(`/products/${id}`);
                fetchProducts();
            } catch (error) {
                console.error('Delete failed', error);
                alert('Failed to delete product');
            }
        }
    };

    const handleCloseForm = () => {
        setShowForm(false);
    };

    const handleSave = () => {
        setShowForm(false);
        fetchProducts();
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return (
        <div className="flex items-center justify-center h-64">
            <div className="relative">
                <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
            </div>
        </div>
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gradient">Products</h1>
                    <p className="text-gray-500 mt-1">Manage your product inventory</p>
                </div>
                <button
                    onClick={handleAdd}
                    className="btn-primary flex items-center gap-2 shadow-lg hover:shadow-xl"
                >
                    <Plus className="h-5 w-5" />
                    Add Product
                </button>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="input pl-10"
                    />
                </div>
                <button className="btn-secondary flex items-center gap-2">
                    <Filter className="h-5 w-5" />
                    Filter
                </button>
            </div>

            {/* Products Grid/Table */}
            <div className="card overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="table-modern">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th className="text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts.map((product) => (
                                <tr key={product.id} className="group">
                                    <td>
                                        <div className="flex items-center gap-4">
                                            <div className="relative">
                                                <img
                                                    className="w-14 h-14 rounded-xl object-cover shadow-md group-hover:shadow-xl transition-shadow"
                                                    src={product.images[0] || 'https://placehold.co/100'}
                                                    alt={product.name}
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                            </div>
                                            <div>
                                                <div className="text-sm font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                                                    {product.name}
                                                </div>
                                                <div className="text-xs text-gray-500 mt-1 line-clamp-1">
                                                    {product.description}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span className="badge badge-primary">
                                            {product.category.name}
                                        </span>
                                    </td>
                                    <td>
                                        <span className="text-lg font-bold text-gray-900">
                                            ${product.price}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => handleEdit(product)}
                                                className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all hover:scale-110"
                                                aria-label="Edit product"
                                            >
                                                <Edit className="h-5 w-5" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(product.id)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all hover:scale-110"
                                                aria-label="Delete product"
                                            >
                                                <Trash2 className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredProducts.length === 0 && (
                    <div className="p-12 text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                            <Package className="h-8 w-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
                        <p className="text-gray-500 mb-4">Get started by adding your first product</p>
                        <button onClick={handleAdd} className="btn-primary">
                            <Plus className="h-5 w-5 mr-2" />
                            Add Product
                        </button>
                    </div>
                )}
            </div>

            {showForm && (
                <ProductForm
                    product={selectedProduct}
                    onClose={handleCloseForm}
                    onSave={handleSave}
                />
            )}
        </div>
    );
}
