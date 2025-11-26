"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import api from '@/lib/api';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import { Star, Heart, Minus, Plus, ChevronRight, Truck, ShieldCheck, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import ProductCard from '@/components/ProductCard';
import clsx from 'clsx';

interface Product {
    id: string;
    name: string;
    slug: string;
    price: string;
    description: string;
    images: string[];
    category: {
        name: string;
    };
}

export default function ProductDetail() {
    const { slug } = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
    const [selectedSize, setSelectedSize] = useState('');
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [activeImage, setActiveImage] = useState(0);
    const { addToCart } = useCart();
    const { showToast } = useToast();

    useEffect(() => {
        if (slug) {
            // setLoading(true); // Removed to avoid cascading render warning
            api.get(`/products/${slug}`)
                .then(res => {
                    setProduct(res.data);
                    // Fetch related products (mocking by fetching all and slicing for now)
                    api.get('/products').then(relatedRes => {
                        const filtered = relatedRes.data.filter((p: Product) => p.id !== res.data.id).slice(0, 4);
                        setRelatedProducts(filtered);
                    });
                    setLoading(false);
                })
                .catch(err => {
                    console.error('Error fetching product:', err);
                    setLoading(false);
                });
        }
    }, [slug]);

    const handleAddToCart = () => {
        if (!product) return;

        if (!selectedSize) {
            showToast('Please select a size', 'error');
            return;
        }
        addToCart({
            productId: product.id,
            name: product.name,
            price: Number(product.price),
            image: product.images[0],
            size: selectedSize,
            quantity: quantity,
        });
        showToast(`Added ${quantity} item(s) to cart`, 'success');
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
    );

    if (!product) return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <p className="text-xl text-muted-foreground">Product not found</p>
        </div>
    );

    const images = product.images.length > 0 ? product.images : ['https://placehold.co/600x800'];

    return (
        <div className="min-h-screen bg-background pt-24 pb-16">
            {/* Breadcrumbs */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
                <div className="flex items-center text-sm text-muted-foreground">
                    <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                    <ChevronRight className="h-4 w-4 mx-2" />
                    <Link href="/shop" className="hover:text-primary transition-colors">Shop</Link>
                    <ChevronRight className="h-4 w-4 mx-2" />
                    <span className="text-foreground font-medium truncate">{product.name}</span>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="lg:grid lg:grid-cols-2 lg:gap-x-16 lg:items-start">
                    {/* Image Gallery */}
                    <div className="flex flex-col-reverse lg:flex-row gap-4">
                        {/* Thumbnails */}
                        <div className="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 scrollbar-hide">
                            {images.map((img: string, idx: number) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveImage(idx)}
                                    aria-label={`View image ${idx + 1}`}
                                    className={clsx(
                                        "relative flex-shrink-0 w-20 h-24 rounded-lg overflow-hidden border-2 transition-all",
                                        activeImage === idx ? "border-primary ring-2 ring-primary/20" : "border-transparent hover:border-border"
                                    )}
                                >
                                    <Image
                                        src={img}
                                        alt={`${product.name} view ${idx + 1}`}
                                        fill
                                        className="object-cover object-center"
                                    />
                                </button>
                            ))}
                        </div>

                        {/* Main Image */}
                        <motion.div
                            layoutId={`product-image-${product.id}`}
                            className="aspect-[3/4] w-full overflow-hidden rounded-2xl bg-secondary border border-border relative group flex-1"
                        >
                            <Image
                                src={images[activeImage]}
                                alt={product.name}
                                fill
                                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                                priority
                            />
                            <div className="absolute top-4 right-4 z-10">
                                <button
                                    className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:shadow-md transition-all text-gray-600 hover:text-red-500"
                                    aria-label="Add to wishlist"
                                >
                                    <Heart className="h-5 w-5" />
                                </button>
                            </div>
                        </motion.div>
                    </div>

                    {/* Product Info */}
                    <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
                        <div className="border-b border-border pb-6">
                            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">{product.name}</h1>
                            <div className="mt-4 flex items-center justify-between">
                                <p className="text-3xl font-bold text-primary">${product.price}</p>
                                <div className="flex items-center gap-1">
                                    <div className="flex text-yellow-400">
                                        {[0, 1, 2, 3, 4].map((rating) => (
                                            <Star key={rating} className="h-4 w-4 fill-current" />
                                        ))}
                                    </div>
                                    <span className="text-sm text-muted-foreground ml-2 underline cursor-pointer hover:text-primary">(42 reviews)</span>
                                </div>
                            </div>
                        </div>

                        <div className="py-6 space-y-6">
                            <p className="text-base text-muted-foreground leading-relaxed">
                                {product.description}
                            </p>

                            {/* Features */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                    <Truck className="h-5 w-5 text-primary" />
                                    <span>Free Shipping over $100</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                    <ShieldCheck className="h-5 w-5 text-primary" />
                                    <span>2 Year Warranty</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                    <RefreshCw className="h-5 w-5 text-primary" />
                                    <span>30 Day Returns</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 space-y-8">
                            {/* Size Selector */}
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-sm font-medium text-foreground">Select Size</h3>
                                    <button className="text-sm font-medium text-primary hover:text-primary/80 underline decoration-dashed underline-offset-4">
                                        Size Guide
                                    </button>
                                </div>
                                <div className="grid grid-cols-5 gap-3">
                                    {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={clsx(
                                                "group relative flex items-center justify-center rounded-lg border py-3 text-sm font-medium uppercase hover:bg-secondary focus:outline-none transition-all",
                                                selectedSize === size
                                                    ? "bg-primary text-primary-foreground border-primary shadow-md ring-2 ring-primary/20"
                                                    : "bg-background text-foreground border-border"
                                            )}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="flex items-center border border-border rounded-lg w-max bg-background">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="p-4 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors rounded-l-lg"
                                        aria-label="Decrease quantity"
                                    >
                                        <Minus className="h-4 w-4" />
                                    </button>
                                    <span className="w-12 text-center font-medium">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="p-4 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors rounded-r-lg"
                                        aria-label="Increase quantity"
                                    >
                                        <Plus className="h-4 w-4" />
                                    </button>
                                </div>
                                <button
                                    onClick={handleAddToCart}
                                    className="flex-1 bg-primary text-primary-foreground border border-transparent rounded-lg py-4 px-8 flex items-center justify-center text-base font-bold hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5 transition-all"
                                >
                                    Add to Bag - ${(Number(product.price) * quantity).toFixed(2)}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                <div className="mt-24 border-t border-border pt-16">
                    <h2 className="text-2xl font-bold tracking-tight text-foreground mb-8">You May Also Like</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {relatedProducts.map((product, idx) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                            >
                                <ProductCard product={product} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
