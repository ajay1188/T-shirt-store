import React, { useState, useEffect } from 'react';
import api from '../lib/api';
import { X, Image as ImageIcon } from 'lucide-react';

interface Category {
    id: string;
    name: string;
}

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    categoryId: string;
    images: string[];
}

interface ProductFormProps {
    product?: Product;
    onClose: () => void;
    onSave: () => void;
}

export default function ProductForm({ product, onClose, onSave }: ProductFormProps) {
    const [name, setName] = useState(product?.name || '');
    const [description, setDescription] = useState(product?.description || '');
    const [price, setPrice] = useState(product?.price?.toString() || '');
    const [categoryId, setCategoryId] = useState(product?.categoryId || '');
    const [image, setImage] = useState(product?.images?.[0] || '');
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await api.get('/categories');
                setCategories(res.data);
                if (!categoryId && res.data.length > 0) {
                    setCategoryId(res.data[0].id);
                }
            } catch (error) {
                console.error('Error fetching categories', error);
            }
        };
        fetchCategories();
    }, [categoryId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = {
                name,
                description,
                price,
                categoryId,
                images: [image],
            };

            if (product) {
                await api.put(`/products/${product.id}`, data);
            } else {
                await api.post('/products', data);
            }
            onSave();
        } catch (error) {
            console.error('Error saving product', error);
            alert('Failed to save product');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-fadeIn">
                {/* Header */}
                <div className="sticky top-0 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-6 rounded-t-2xl flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold">{product ? 'Edit Product' : 'Add New Product'}</h2>
                        <p className="text-indigo-100 text-sm mt-1">Fill in the product details below</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                        aria-label="Close"
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    {/* Product Name */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                            Product Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            required
                            className="input"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. Classic White T-Shirt"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
                            Description
                        </label>
                        <textarea
                            id="description"
                            required
                            rows={4}
                            className="input resize-none"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Describe your product..."
                        />
                    </div>

                    {/* Price and Category Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Price */}
                        <div>
                            <label htmlFor="price" className="block text-sm font-semibold text-gray-700 mb-2">
                                Price ($)
                            </label>
                            <input
                                id="price"
                                type="number"
                                step="0.01"
                                required
                                className="input"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                placeholder="29.99"
                            />
                        </div>

                        {/* Category */}
                        <div>
                            <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-2">
                                Category
                            </label>
                            <select
                                id="category"
                                className="input"
                                value={categoryId}
                                onChange={(e) => setCategoryId(e.target.value)}
                            >
                                <option value="">Select Category</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Image URL */}
                    <div>
                        <label htmlFor="image" className="block text-sm font-semibold text-gray-700 mb-2">
                            Image URL
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <ImageIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                id="image"
                                type="url"
                                required
                                className="input pl-10"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                                placeholder="https://example.com/image.jpg"
                            />
                        </div>
                        {image && (
                            <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                                <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
                                <img
                                    src={image}
                                    alt="Preview"
                                    className="w-full h-48 object-cover rounded-lg shadow-md"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = 'https://placehold.co/600x400?text=Invalid+Image';
                                    }}
                                />
                            </div>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="btn-secondary flex-1"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    <span>Saving...</span>
                                </div>
                            ) : (
                                <span>{product ? 'Update Product' : 'Create Product'}</span>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
