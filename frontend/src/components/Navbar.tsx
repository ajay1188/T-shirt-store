"use client";

import Link from 'next/link';
import { ShoppingCart, User, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout } = useAuth();

    return (
        <nav className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/" className="text-2xl font-bold text-gray-900 tracking-tight">
                            LOOMSPACE
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="/shop" className="text-gray-700 hover:text-black">Shop</Link>
                        <Link href="/shop?category=men" className="text-gray-700 hover:text-black">Men</Link>
                        <Link href="/shop?category=women" className="text-gray-700 hover:text-black">Women</Link>
                        <Link href="/shop?category=oversized" className="text-gray-700 hover:text-black">Oversized</Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-4">
                        <Link href="/cart" className="text-gray-700 hover:text-black relative">
                            <ShoppingCart className="h-6 w-6" />
                            {/* Cart count badge could go here */}
                        </Link>

                        {user ? (
                            <div className="relative group">
                                <button className="flex items-center text-gray-700 hover:text-black" aria-label="User menu">
                                    <User className="h-6 w-6" />
                                </button>
                                <div className="absolute right-0 w-48 bg-white shadow-lg rounded-md py-2 hidden group-hover:block border">
                                    <div className="px-4 py-2 text-sm text-gray-500">Hi, {user.name}</div>
                                    <Link href="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Orders</Link>
                                    <button onClick={logout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</button>
                                </div>
                            </div>
                        ) : (
                            <Link href="/login" className="text-gray-700 hover:text-black">Login</Link>
                        )}
                    </div>

                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700" aria-label="Toggle menu">
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-t">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link href="/shop" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-black hover:bg-gray-50">Shop</Link>
                        <Link href="/shop?category=men" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-black hover:bg-gray-50">Men</Link>
                        <Link href="/shop?category=women" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-black hover:bg-gray-50">Women</Link>
                        <Link href="/cart" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-black hover:bg-gray-50">Cart</Link>
                        {user ? (
                            <>
                                <Link href="/orders" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-black hover:bg-gray-50">My Orders</Link>
                                <button onClick={logout} className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-black hover:bg-gray-50">Logout</button>
                            </>
                        ) : (
                            <Link href="/login" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-black hover:bg-gray-50">Login</Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
