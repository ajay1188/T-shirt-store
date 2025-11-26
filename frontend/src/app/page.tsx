"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import api from '@/lib/api';
import ProductCard from '@/components/ProductCard';
import Testimonials from '@/components/Testimonials';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, ShieldCheck, Truck, RefreshCw } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  slug: string;
  price: string;
  images: string[];
  category: {
    name: string;
  };
}

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    api.get('/products')
      .then(res => {
        setFeaturedProducts(res.data.slice(0, 4));
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-background">
        {/* Abstract Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-[30%] -right-[10%] w-[70%] h-[70%] rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-500/5 blur-3xl" />
          <div className="absolute bottom-[10%] right-[20%] w-[40%] h-[40%] rounded-full bg-purple-500/5 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border text-foreground text-sm font-medium animate-fade-in-up">
              <Sparkles className="h-4 w-4 text-primary" />
              <span>New Collection Drop — SS25</span>
            </div>

            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tighter leading-tight">
              <span className="block text-foreground">Elevate Your</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">Everyday</span>
            </h1>

            <p className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-light">
              Premium essentials crafted for the modern minimalist.
              Experience the perfect blend of comfort, durability, and style.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10">
              <Link
                href="/shop"
                className="group inline-flex items-center gap-2 bg-primary text-primary-foreground px-10 py-4 rounded-full font-medium hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/25 hover:-translate-y-1"
              >
                Shop Collection
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/shop?category=oversized"
                className="inline-flex items-center gap-2 bg-white text-foreground px-10 py-4 rounded-full font-medium hover:bg-gray-50 transition-all border border-border hover:-translate-y-1 shadow-sm"
              >
                Explore Oversized
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Banner */}
      <section className="border-y border-border bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: ShieldCheck, title: "Premium Quality", desc: "Crafted with the finest materials" },
              { icon: Truck, title: "Fast Shipping", desc: "Free delivery on orders over $100" },
              { icon: RefreshCw, title: "Easy Returns", desc: "30-day hassle-free return policy" }
            ].map((feature, idx) => (
              <div key={idx} className="flex items-center gap-4 justify-center md:justify-start">
                <div className="p-3 bg-background rounded-xl border border-border shadow-sm">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">Shop by Category</h2>
            <p className="mt-4 text-muted-foreground">Find your perfect fit</p>
          </div>
          <Link href="/shop" className="hidden sm:flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all">
            View all categories <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: 'Men', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop' },
            { name: 'Women', image: 'https://images.unsplash.com/photo-1503341455253-b2e72333dbdb?q=80&w=800&auto=format&fit=crop' },
            { name: 'Oversized', image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800&auto=format&fit=crop' }
          ].map((cat, idx) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Link
                href={`/shop?category=${cat.name.toLowerCase()}`}
                className="group relative block rounded-2xl overflow-hidden h-[400px] border border-border"
              >
                <div className="absolute inset-0 group-hover:scale-105 transition-transform duration-700">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover object-center"
                  />
                </div>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
                  <h3 className="text-4xl font-bold text-white mb-2 tracking-tight">
                    {cat.name}
                  </h3>
                  <span className="inline-block px-6 py-2 bg-white/20 backdrop-blur-md text-white rounded-full text-sm font-medium border border-white/30 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    Shop Now
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-secondary/30 py-24 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">Featured Drops</h2>
              <p className="mt-2 text-muted-foreground">Handpicked for you</p>
            </div>
            <Link href="/shop" className="group inline-flex items-center gap-2 text-primary hover:gap-3 transition-all font-medium">
              View all
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.length > 0 ? featuredProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            )) : (
              // Skeletons
              [...Array(4)].map((_, i) => (
                <div key={i} className="space-y-4">
                  <div className="aspect-[3/4] bg-secondary rounded-xl animate-pulse" />
                  <div className="h-4 bg-secondary rounded w-3/4 animate-pulse" />
                  <div className="h-4 bg-secondary rounded w-1/2 animate-pulse" />
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* Newsletter */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-primary to-blue-700 rounded-3xl p-12 space-y-6 text-white shadow-2xl relative overflow-hidden"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Join the Inner Circle</h2>
              <p className="text-lg text-blue-100 max-w-xl mx-auto">
                Get early access to new drops, exclusive offers, and styling tips straight to your inbox.
              </p>

              <form className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  required
                  className="flex-1 px-5 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 text-white placeholder:text-blue-200 backdrop-blur-sm"
                  placeholder="Enter your email"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-white text-primary rounded-lg font-bold hover:bg-blue-50 transition-colors shadow-lg"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
