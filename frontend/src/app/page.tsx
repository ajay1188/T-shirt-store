"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import api from '@/lib/api';
import ProductCard from '@/components/ProductCard';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    api.get('/products')
      .then(res => {
        // Just taking first 4 for featured
        setFeaturedProducts(res.data.slice(0, 4));
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <div className="relative bg-gray-900 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <img src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" alt="Hero background" className="w-full h-full object-cover opacity-50" />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">LOOMSPACE</h1>
          <p className="mt-6 text-xl max-w-3xl">
            Premium tees designed for the modern individual. Quality you can feel, style you can wear.
          </p>
          <div className="mt-10">
            <Link href="/shop" className="inline-block bg-white text-gray-900 px-8 py-3 border border-transparent text-base font-medium rounded-md hover:bg-gray-100">
              Shop Collection
            </Link>
          </div>
        </div>
      </div>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-8">Shop by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {['Men', 'Women', 'Oversized'].map((cat) => (
            <Link key={cat} href={`/shop?category=${cat.toLowerCase()}`} className="relative rounded-lg overflow-hidden group h-64">
              <div className="absolute inset-0 bg-gray-200">
                {/* Placeholder for category images */}
                <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500">
                  {cat} Image
                </div>
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-opacity" />
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-2xl font-bold text-white">{cat}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Featured Drops</h2>
          <Link href="/shop" className="text-indigo-600 hover:text-indigo-500">View all &rarr;</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6">
          {featuredProducts.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">Join the Inner Circle</h2>
          <p className="mt-4 text-lg text-gray-500">Get early access to new drops and exclusive offers.</p>
          <form className="mt-8 sm:flex justify-center max-w-md mx-auto">
            <input type="email" required className="w-full px-5 py-3 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs border-gray-300 rounded-md" placeholder="Enter your email" />
            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
              <button type="submit" className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
