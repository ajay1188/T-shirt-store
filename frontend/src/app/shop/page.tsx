"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import api from "@/lib/api";
import ProductCard from "@/components/ProductCard";
import { motion } from "framer-motion";
import { Filter, ChevronDown, SlidersHorizontal } from "lucide-react";
import clsx from "clsx";

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

function ShopContent() {
    const searchParams = useSearchParams();
    const category = searchParams.get("category");
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [showFilters, setShowFilters] = useState(false);
    const [sortBy, setSortBy] = useState("newest");

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            let url = "/products";
            if (category) {
                url += `?category=${category}`;
            }
            try {
                const res = await api.get(url);
                setProducts(res.data);
            } catch (err) {
                console.error(err);
            }
            setLoading(false);
        };
        fetchProducts();
    }, [category]);

    return (
        <div className="min-h-screen bg-background pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end border-b border-border pb-8 mb-8 gap-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground capitalize">
                            {category ? `${category} Collection` : "All Products"}
                        </h1>
                        <p className="mt-4 text-lg text-muted-foreground">
                            {category
                                ? `Discover our ${category} collection`
                                : "Explore our complete range of premium tees"}
                        </p>
                    </motion.div>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-secondary transition-colors md:hidden"
                        >
                            <Filter className="h-4 w-4" />
                            Filters
                        </button>
                        <div className="relative group">
                            <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-secondary transition-colors min-w-[160px] justify-between">
                                <span className="text-sm font-medium">Sort by: {sortBy === 'newest' ? 'Newest' : 'Price: Low to High'}</span>
                                <ChevronDown className="h-4 w-4 text-muted-foreground" />
                            </button>
                            <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-xl py-1 hidden group-hover:block z-20">
                                <button onClick={() => setSortBy('newest')} className="block w-full text-left px-4 py-2 text-sm hover:bg-secondary">Newest</button>
                                <button onClick={() => setSortBy('price_asc')} className="block w-full text-left px-4 py-2 text-sm hover:bg-secondary">Price: Low to High</button>
                                <button onClick={() => setSortBy('price_desc')} className="block w-full text-left px-4 py-2 text-sm hover:bg-secondary">Price: High to Low</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-12">
                    {/* Sidebar Filters - Desktop */}
                    <div className={clsx(
                        "w-full md:w-64 flex-shrink-0 space-y-8",
                        showFilters ? "block" : "hidden md:block"
                    )}>
                        <div>
                            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4">Categories</h3>
                            <div className="space-y-3">
                                {['All Products', 'Men', 'Women', 'Oversized'].map((cat) => (
                                    <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                                        <div className="w-4 h-4 border border-border rounded flex items-center justify-center group-hover:border-primary transition-colors">
                                            {/* Checkbox logic would go here */}
                                        </div>
                                        <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{cat}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4">Price Range</h3>
                            <div className="space-y-3">
                                {['Under $50', '$50 - $100', '$100+'].map((range) => (
                                    <label key={range} className="flex items-center gap-3 cursor-pointer group">
                                        <div className="w-4 h-4 border border-border rounded flex items-center justify-center group-hover:border-primary transition-colors"></div>
                                        <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{range}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4">Size</h3>
                            <div className="grid grid-cols-3 gap-2">
                                {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                                    <button key={size} className="border border-border rounded py-2 text-sm text-muted-foreground hover:border-primary hover:text-primary transition-colors">
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Products Grid */}
                    <div className="flex-1">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {loading ? (
                                // Loading skeleton
                                Array.from({ length: 6 }).map((_, idx) => (
                                    <div key={idx} className="space-y-4 animate-pulse">
                                        <div className="aspect-[3/4] bg-secondary rounded-xl" />
                                        <div className="h-4 bg-secondary rounded w-3/4" />
                                        <div className="h-4 bg-secondary rounded w-1/2" />
                                    </div>
                                ))
                            ) : products.length > 0 ? (
                                products.map((product, idx) => (
                                    <motion.div
                                        key={product.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                    >
                                        <ProductCard product={product} />
                                    </motion.div>
                                ))
                            ) : (
                                <div className="col-span-full text-center py-24 bg-secondary/30 rounded-2xl border border-dashed border-border">
                                    <SlidersHorizontal className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                    <h3 className="text-lg font-semibold text-foreground">No products found</h3>
                                    <p className="text-muted-foreground">Try adjusting your filters or search criteria.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Shop() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-background pt-24 flex items-center justify-center">
                <div className="text-center space-y-4">
                    <div className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
                    <p className="text-muted-foreground">Loading products...</p>
                </div>
            </div>
        }>
            <ShopContent />
        </Suspense>
    );
}
