"use client";

import Link from 'next/link';
import { ShoppingCart, User, Menu, X, Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { useCart } from '../context/CartContext';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { user, logout } = useAuth();
    const { cart } = useCart();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <nav
            className={clsx(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b",
                scrolled
                    ? "bg-background/80 backdrop-blur-md border-border py-3 shadow-sm"
                    : "bg-transparent border-transparent py-5"
            )}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link href="/" className="text-2xl font-bold tracking-tighter text-foreground hover:opacity-80 transition-opacity flex items-center gap-2">
                            <span className="bg-primary text-primary-foreground w-8 h-8 flex items-center justify-center rounded-lg text-lg">L</span>
                            <span>LOOMSPACE</span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {['Shop', 'Men', 'Women', 'Oversized'].map((item) => (
                            <Link
                                key={item}
                                href={item === 'Shop' ? '/shop' : `/shop?category=${item.toLowerCase()}`}
                                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative group"
                            >
                                {item}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
                            </Link>
                        ))}
                    </div>

                    {/* Icons */}
                    <div className="hidden md:flex items-center space-x-6">
                        <button
                            className="text-muted-foreground hover:text-foreground transition-colors"
                            aria-label="Search"
                        >
                            <Search className="h-5 w-5" />
                        </button>

                        <Link href="/cart" className="text-muted-foreground hover:text-foreground transition-colors relative group" aria-label="Cart">
                            <ShoppingCart className="h-5 w-5" />
                            {cartItemCount > 0 && (
                                <span className="absolute -top-2 -right-2 h-4 w-4 bg-primary text-[10px] font-bold text-primary-foreground flex items-center justify-center rounded-full">
                                    {cartItemCount}
                                </span>
                            )}
                        </Link>

                        {user ? (
                            <div className="relative group">
                                <button
                                    className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                                    aria-label="User menu"
                                >
                                    <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-foreground">
                                        <User className="h-4 w-4" />
                                    </div>
                                </button>
                                <div className="absolute right-0 mt-2 w-56 bg-card border border-border rounded-xl shadow-xl py-2 hidden group-hover:block animate-in fade-in slide-in-from-top-2">
                                    <div className="px-4 py-3 border-b border-border mb-2">
                                        <p className="text-sm font-medium text-foreground">{user.name}</p>
                                        <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                                    </div>
                                    <Link href="/orders" className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
                                        My Orders
                                    </Link>
                                    <Link href="/profile" className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
                                        Profile Settings
                                    </Link>
                                    <div className="border-t border-border mt-2 pt-2">
                                        <button
                                            onClick={logout}
                                            className="block w-full text-left px-4 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <Link
                                href="/login"
                                className="text-sm font-medium bg-primary text-primary-foreground px-4 py-2 rounded-full hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/25"
                            >
                                Login
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center gap-4">
                        <Link href="/cart" className="text-foreground relative">
                            <ShoppingCart className="h-5 w-5" />
                            {cartItemCount > 0 && (
                                <span className="absolute -top-2 -right-2 h-4 w-4 bg-primary text-[10px] font-bold text-primary-foreground flex items-center justify-center rounded-full">
                                    {cartItemCount}
                                </span>
                            )}
                        </Link>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-foreground p-2 hover:bg-secondary rounded-md transition-colors"
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-background border-b border-border overflow-hidden"
                    >
                        <div className="px-4 pt-2 pb-6 space-y-1">
                            {['Shop', 'Men', 'Women', 'Oversized'].map((item) => (
                                <Link
                                    key={item}
                                    href={item === 'Shop' ? '/shop' : `/shop?category=${item.toLowerCase()}`}
                                    className="block px-3 py-4 text-lg font-medium text-foreground border-b border-border/50 hover:text-primary transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item}
                                </Link>
                            ))}
                            {user ? (
                                <>
                                    <Link
                                        href="/orders"
                                        className="block px-3 py-4 text-lg font-medium text-foreground border-b border-border/50 hover:text-primary transition-colors"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        My Orders
                                    </Link>
                                    <button
                                        onClick={() => { logout(); setIsOpen(false); }}
                                        className="block w-full text-left px-3 py-4 text-lg font-medium text-destructive hover:bg-destructive/10 rounded-md transition-colors"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <Link
                                    href="/login"
                                    className="block px-3 py-4 text-lg font-medium text-primary hover:text-primary/80 transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Login / Register
                                </Link>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
