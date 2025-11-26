import React, { useEffect, useState } from 'react';
import api from '../lib/api';
import { Plus, Trash2, Edit, X, Layers, Tag } from 'lucide-react';
import toast from 'react-hot-toast';

interface Category {
    id: string;
    name: string;
    slug: string;
}

export default function Categories() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [formData, setFormData] = useState({ name: '' });

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const res = await api.get('/categories');
            setCategories(res.data);
        } catch (error) {
            console.error('Failed to fetch categories', error);
            toast.error('Failed to load categories');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingCategory) {
                await api.put(`/categories/${editingCategory.id}`, formData);
                toast.success('Category updated successfully');
            } else {
                await api.post('/categories', formData);
                toast.success('Category created successfully');
            }
            setShowModal(false);
            setFormData({ name: '' });
            setEditingCategory(null);
            fetchCategories();
        } catch (error) {
            console.error('Failed to save category', error);
            toast.error('Failed to save category');
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this category?')) return;
        try {
            await api.delete(`/categories/${id}`);
            toast.success('Category deleted');
            fetchCategories();
        } catch (error) {
            console.error('Failed to delete category', error);
            toast.error('Failed to delete category');
        }
    };

    const openModal = (category?: Category) => {
        if (category) {
            setEditingCategory(category);
            setFormData({ name: category.name });
        } else {
            setEditingCategory(null);
            setFormData({ name: '' });
        }
        setShowModal(true);
    };

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
                    <h1 className="text-3xl font-bold text-gradient">Categories</h1>
                    <p className="text-gray-500 mt-1">Organize your products into categories</p>
                </div>
                <button
                    onClick={() => openModal()}
                    className="btn-primary flex items-center gap-2 shadow-lg hover:shadow-xl"
                >
                    <Plus className="h-5 w-5" />
                    Add Category
                </button>
            </div>

            {/* Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((category) => (
                    <div
                        key={category.id}
                        className="card p-6 group cursor-pointer"
                    >
                        {/* Icon */}
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                                <Layers className="h-6 w-6 text-white" />
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    aria-label="Edit category"
                                    onClick={() => openModal(category)}
                                    className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all hover:scale-110"
                                >
                                    <Edit className="h-4 w-4" />
                                </button>
                                <button
                                    aria-label="Delete category"
                                    onClick={() => handleDelete(category.id)}
                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all hover:scale-110"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>
                        </div>

                        {/* Category Info */}
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                                {category.name}
                            </h3>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <Tag className="h-4 w-4" />
                                <span className="font-mono">{category.slug}</span>
                            </div>
                        </div>

                        {/* Decorative Element */}
                        <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-indigo-50 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {categories.length === 0 && (
                <div className="card p-12 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full mb-4">
                        <Layers className="h-8 w-8 text-indigo-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No categories found</h3>
                    <p className="text-gray-500 mb-4">Create your first category to get started</p>
                    <button onClick={() => openModal()} className="btn-primary">
                        <Plus className="h-5 w-5 mr-2" />
                        Add Category
                    </button>
                </div>
            )}

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md animate-fadeIn">
                        {/* Header */}
                        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-5 rounded-t-2xl flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-bold">
                                    {editingCategory ? 'Edit Category' : 'New Category'}
                                </h2>
                                <p className="text-indigo-100 text-sm mt-1">
                                    {editingCategory ? 'Update category details' : 'Create a new product category'}
                                </p>
                            </div>
                            <button
                                aria-label="Close modal"
                                onClick={() => setShowModal(false)}
                                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                            >
                                <X className="h-6 w-6" />
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Category Name
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="input"
                                    placeholder="e.g. Summer Collection"
                                />
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="btn-secondary flex-1"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="btn-primary flex-1"
                                >
                                    {editingCategory ? 'Update' : 'Create'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
