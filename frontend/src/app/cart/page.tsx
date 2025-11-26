"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { Trash2, Minus, Plus, ArrowRight, ShoppingBag, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Cart() {
    const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

    if (cart.length === 0) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 bg-background">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-secondary/50 p-8 rounded-full mb-6"
                >
                    <ShoppingBag className="h-16 w-16 text-muted-foreground/50" />
                </motion.div>
                <h2 className="text-3xl font-bold text-foreground tracking-tight">Your cart is empty</h2>
                <p className="mt-4 text-muted-foreground max-w-sm text-lg">
                    Looks like you haven&apos;t added anything yet. Explore our collection to find your perfect fit.
                </p>
                <div className="mt-10">
                    <Link
                        href="/shop"
                        className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-full text-primary-foreground bg-primary hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/25 hover:-translate-y-1"
                    >
                        Start Shopping <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-background min-h-screen pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-12">Shopping Cart ({cart.length} items)</h1>

                <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
                    <section className="lg:col-span-7">
                        <div className="space-y-6">
                            <AnimatePresence initial={false}>
                                {cart.map((item) => (
                                    <motion.div
                                        key={`${item.productId}-${item.size}`}
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                                        className="flex p-6 bg-card border border-border rounded-2xl shadow-sm hover:shadow-md transition-shadow"
                                    >
                                        <div className="flex-shrink-0 relative">
                                            <Image
                                                src={item.image || 'https://placehold.co/200'}
                                                alt={item.name}
                                                width={120}
                                                height={120}
                                                className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl object-center object-cover border border-border bg-secondary"
                                            />
                                        </div>

                                        <div className="ml-6 flex-1 flex flex-col justify-between">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="text-lg font-semibold">
                                                        <Link href={`/product/${item.productId}`} className="text-foreground hover:text-primary transition-colors">
                                                            {item.name}
                                                        </Link>
                                                    </h3>
                                                    <p className="mt-1 text-sm text-muted-foreground">Size: {item.size}</p>
                                                </div>
                                                <p className="text-lg font-bold text-primary">${item.price}</p>
                                            </div>

                                            <div className="mt-4 flex items-center justify-between">
                                                <div className="flex items-center border border-border rounded-lg bg-background">
                                                    <button
                                                        onClick={() => updateQuantity(item.productId, item.size, Math.max(1, item.quantity - 1))}
                                                        className="p-2 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors rounded-l-lg"
                                                        aria-label="Decrease quantity"
                                                    >
                                                        <Minus className="h-4 w-4" />
                                                    </button>
                                                    <span className="w-10 text-center text-sm font-medium">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.productId, item.size, item.quantity + 1)}
                                                        className="p-2 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors rounded-r-lg"
                                                        aria-label="Increase quantity"
                                                    >
                                                        <Plus className="h-4 w-4" />
                                                    </button>
                                                </div>

                                                <button
                                                    type="button"
                                                    onClick={() => removeFromCart(item.productId, item.size)}
                                                    className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                                                    aria-label="Remove item"
                                                >
                                                    <Trash2 className="h-5 w-5" />
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </section>

                    {/* Order summary */}
                    <section className="mt-16 lg:mt-0 lg:col-span-5">
                        <div className="bg-secondary/30 rounded-2xl p-8 border border-border sticky top-24 backdrop-blur-sm">
                            <h2 className="text-xl font-semibold text-foreground mb-6">Order Summary</h2>

                            <dl className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <dt className="text-sm text-muted-foreground">Subtotal</dt>
                                    <dd className="text-sm font-medium text-foreground">${cartTotal.toFixed(2)}</dd>
                                </div>
                                <div className="flex items-center justify-between border-t border-border pt-4">
                                    <dt className="text-sm text-muted-foreground">Shipping estimate</dt>
                                    <dd className="text-sm font-medium text-foreground">
                                        {cartTotal > 100 ? (
                                            <span className="text-green-600 font-medium">Free</span>
                                        ) : (
                                            "$5.00"
                                        )}
                                    </dd>
                                </div>
                                <div className="flex items-center justify-between border-t border-border pt-4">
                                    <dt className="text-lg font-bold text-foreground">Order Total</dt>
                                    <dd className="text-2xl font-bold text-primary">
                                        ${(cartTotal + (cartTotal > 100 ? 0 : 5)).toFixed(2)}
                                    </dd>
                                </div>
                            </dl>

                            <div className="mt-8 space-y-4">
                                <Link
                                    href="/checkout"
                                    className="w-full flex items-center justify-center bg-primary border border-transparent rounded-xl py-4 px-4 text-base font-bold text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
                                >
                                    Proceed to Checkout
                                </Link>
                                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                                    <ShieldCheck className="h-4 w-4" />
                                    <span>Secure Checkout - 100% Money Back Guarantee</span>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
