'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShoppingBag, Eye } from 'lucide-react';

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

export default function ProductCard({ product }: { product: Product }) {
    return (
        <Link href={`/product/${product.slug}`} className="group block">
            <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="relative"
            >
                <div className="aspect-[3/4] w-full overflow-hidden rounded-xl bg-secondary border border-border relative">
                    {/* Main Image */}
                    <Image
                        src={product.images[0] || 'https://placehold.co/600x800'}
                        alt={product.name}
                        width={600}
                        height={800}
                        className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    />

                    {/* Secondary Image (if available) - Fade in on hover */}
                    {product.images[1] && (
                        <Image
                            src={product.images[1]}
                            alt={product.name}
                            width={600}
                            height={800}
                            className="absolute inset-0 h-full w-full object-cover object-center opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        />
                    )}

                    {/* Overlay Actions */}
                    <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out flex gap-2">
                        <button className="flex-1 bg-white/90 backdrop-blur-sm text-gray-900 py-3 rounded-lg font-medium text-sm hover:bg-white shadow-lg flex items-center justify-center gap-2 transition-colors">
                            <ShoppingBag className="h-4 w-4" />
                            Quick Add
                        </button>
                    </div>

                    {/* Badges */}
                    <div className="absolute top-3 left-3">
                        <span className="bg-white/90 backdrop-blur-sm text-gray-900 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider shadow-sm">
                            New Arrival
                        </span>
                    </div>
                </div>

                <div className="mt-4 space-y-1">
                    <div className="flex justify-between items-start">
                        <h3 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1">
                            {product.name}
                        </h3>
                        <p className="text-sm font-semibold text-foreground">
                            ${product.price}
                        </p>
                    </div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">
                        {product.category.name}
                    </p>
                </div>
            </motion.div>
        </Link>
    );
}
