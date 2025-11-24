"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import api from '@/lib/api';
import { useCart } from '@/context/CartContext';
import { Star } from 'lucide-react';

export default function ProductDetail() {
    const { slug } = useParams();
    const [product, setProduct] = useState<any>(null);
    const [selectedSize, setSelectedSize] = useState('');
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();

    useEffect(() => {
        if (slug) {
            api.get(`/products/${slug}`)
                .then(res => {
                    setProduct(res.data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error(err);
                    setLoading(false);
                });
        }
    }, [slug]);

    const handleAddToCart = () => {
        if (!selectedSize) {
            alert('Please select a size');
            return;
        }
        addToCart({
            productId: product.id,
            name: product.name,
            price: Number(product.price),
            image: product.images[0],
            size: selectedSize,
            quantity: 1,
        });
        alert('Added to cart!');
    };

    if (loading) return <div className="p-8 text-center">Loading...</div>;
    if (!product) return <div className="p-8 text-center">Product not found</div>;

    return (
        <div className="bg-white">
            <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
                <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
                    {/* Image gallery */}
                    <div className="flex flex-col-reverse">
                        <div className="w-full aspect-w-1 aspect-h-1">
                            <Image
                                src={product.images[0] || 'https://placehold.co/600x400'}
                                alt={product.name}
                                width={600}
                                height={600}
                                className="w-full h-full object-center object-cover sm:rounded-lg"
                            />
                        </div>
                    </div>

                    {/* Product info */}
                    <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
                        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">{product.name}</h1>

                        <div className="mt-3">
                            <h2 className="sr-only">Product information</h2>
                            <p className="text-3xl text-gray-900">${product.price}</p>
                        </div>

                        {/* Reviews */}
                        <div className="mt-3">
                            <div className="flex items-center">
                                <div className="flex items-center">
                                    {[0, 1, 2, 3, 4].map((rating) => (
                                        <Star
                                            key={rating}
                                            className={`h-5 w-5 flex-shrink-0 ${4 > rating ? 'text-yellow-400' : 'text-gray-300'
                                                }`}
                                            aria-hidden="true"
                                            fill="currentColor"
                                        />
                                    ))}
                                </div>
                                <p className="sr-only">4 out of 5 stars</p>
                            </div>
                        </div>

                        <div className="mt-6">
                            <h3 className="sr-only">Description</h3>
                            <div className="text-base text-gray-700 space-y-6" dangerouslySetInnerHTML={{ __html: product.description }} />
                        </div>

                        <div className="mt-6">
                            {/* Size selector */}
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm text-gray-900 font-medium">Size</h3>
                                <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                    Size guide
                                </a>
                            </div>

                            <div className="mt-4 grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                                {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                                    <button
                                        key={size}
                                        type="button"
                                        onClick={() => setSelectedSize(size)}
                                        className={`group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 ${selectedSize === size
                                                ? 'bg-indigo-600 border-transparent text-white hover:bg-indigo-700'
                                                : 'bg-white border-gray-300 text-gray-900'
                                            }`}
                                    >
                                        <span>{size}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="mt-10 flex sm:flex-col1">
                            <button
                                type="button"
                                onClick={handleAddToCart}
                                className="max-w-xs flex-1 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 sm:w-full"
                            >
                                Add to bag
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
