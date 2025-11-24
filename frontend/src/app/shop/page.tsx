"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import api from '@/lib/api';
import ProductCard from '@/components/ProductCard';

export default function Shop() {
    const searchParams = useSearchParams();
    const category = searchParams.get('category');
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        let url = '/products';
        if (category) {
            url += `?category=${category}`;
        }

        api.get(url)
            .then(res => {
                setProducts(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [category]);

    return (
        <div className="bg-white">
            <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
                <div className="border-b border-gray-200 pb-10">
                    <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 capitalize">
                        {category ? `${category} Collection` : 'All Products'}
                    </h1>
                    <p className="mt-4 text-base text-gray-500">
                        Check out our latest arrivals.
                    </p>
                </div>

                <div className="pt-12 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {loading ? (
                        <p>Loading...</p>
                    ) : products.length > 0 ? (
                        products.map((product: any) => (
                            <ProductCard key={product.id} product={product} />
                        ))
                    ) : (
                        <p>No products found.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
