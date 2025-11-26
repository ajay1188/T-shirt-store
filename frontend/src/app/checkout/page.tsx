"use client";

import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import { useToast } from '@/context/ToastContext';
import Image from 'next/image';
import { Lock, CreditCard } from 'lucide-react';

export default function Checkout() {
    const { cart, cartTotal, clearCart } = useCart();
    const router = useRouter();
    const { showToast } = useToast();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        country: '',
        postalCode: '',
        cardName: '',
        cardNumber: '',
        expDate: '',
        cvc: '',
    });

    // Redirect to cart if empty
    useEffect(() => {
        if (cart.length === 0) {
            router.push('/cart');
        }
    }, [cart.length, router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            clearCart();
            showToast('Order placed successfully!', 'success');
            router.push('/orders');
        }, 2000);
    };

    const shippingCost = cartTotal > 100 ? 0 : 5;
    const total = cartTotal + shippingCost;

    // Show loading state while redirecting
    if (cart.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
                    {/* Checkout Form */}
                    <div className="lg:col-span-7">
                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Contact Info */}
                            <section className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm">
                                <h2 className="text-xl font-semibold text-foreground mb-6">Contact Information</h2>
                                <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                                    <div className="sm:col-span-2">
                                        <label htmlFor="email" className="block text-sm font-medium text-foreground">Email address</label>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            required
                                            className="mt-1 block w-full rounded-lg border-border bg-background text-foreground shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-3 px-4"
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </section>

                            {/* Shipping Address */}
                            <section className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm">
                                <h2 className="text-xl font-semibold text-foreground mb-6">Shipping Address</h2>
                                <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                                    <div>
                                        <label htmlFor="firstName" className="block text-sm font-medium text-foreground">First name</label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            id="firstName"
                                            required
                                            className="mt-1 block w-full rounded-lg border-border bg-background text-foreground shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-3 px-4"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="lastName" className="block text-sm font-medium text-foreground">Last name</label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            id="lastName"
                                            required
                                            className="mt-1 block w-full rounded-lg border-border bg-background text-foreground shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-3 px-4"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label htmlFor="address" className="block text-sm font-medium text-foreground">Address</label>
                                        <input
                                            type="text"
                                            name="address"
                                            id="address"
                                            required
                                            className="mt-1 block w-full rounded-lg border-border bg-background text-foreground shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-3 px-4"
                                            value={formData.address}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="city" className="block text-sm font-medium text-foreground">City</label>
                                        <input
                                            type="text"
                                            name="city"
                                            id="city"
                                            required
                                            className="mt-1 block w-full rounded-lg border-border bg-background text-foreground shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-3 px-4"
                                            value={formData.city}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="country" className="block text-sm font-medium text-foreground">Country</label>
                                        <input
                                            type="text"
                                            name="country"
                                            id="country"
                                            required
                                            className="mt-1 block w-full rounded-lg border-border bg-background text-foreground shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-3 px-4"
                                            value={formData.country}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="postalCode" className="block text-sm font-medium text-foreground">Postal code</label>
                                        <input
                                            type="text"
                                            name="postalCode"
                                            id="postalCode"
                                            required
                                            className="mt-1 block w-full rounded-lg border-border bg-background text-foreground shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-3 px-4"
                                            value={formData.postalCode}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </section>

                            {/* Payment */}
                            <section className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm">
                                <h2 className="text-xl font-semibold text-foreground mb-6">Payment Details</h2>
                                <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                                    <div className="sm:col-span-2">
                                        <label htmlFor="cardNumber" className="block text-sm font-medium text-foreground">Card number</label>
                                        <div className="relative mt-1">
                                            <input
                                                type="text"
                                                name="cardNumber"
                                                id="cardNumber"
                                                required
                                                className="block w-full rounded-lg border-border bg-background text-foreground shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-3 px-4 pl-10"
                                                value={formData.cardNumber}
                                                onChange={handleChange}
                                            />
                                            <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="expDate" className="block text-sm font-medium text-foreground">Expiration date (MM/YY)</label>
                                        <input
                                            type="text"
                                            name="expDate"
                                            id="expDate"
                                            required
                                            className="mt-1 block w-full rounded-lg border-border bg-background text-foreground shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-3 px-4"
                                            value={formData.expDate}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="cvc" className="block text-sm font-medium text-foreground">CVC</label>
                                        <input
                                            type="text"
                                            name="cvc"
                                            id="cvc"
                                            required
                                            className="mt-1 block w-full rounded-lg border-border bg-background text-foreground shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-3 px-4"
                                            value={formData.cvc}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </section>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex items-center justify-center bg-primary border border-transparent rounded-xl py-4 px-4 text-base font-bold text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    `Pay $${total.toFixed(2)}`
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Order Summary Sidebar */}
                    <div className="mt-16 lg:mt-0 lg:col-span-5">
                        <div className="bg-secondary/30 rounded-2xl p-8 border border-border sticky top-24 backdrop-blur-sm">
                            <h2 className="text-xl font-semibold text-foreground mb-6">Order Summary</h2>
                            <ul className="divide-y divide-border">
                                {cart.map((item) => (
                                    <li key={`${item.productId}-${item.size}`} className="flex py-6">
                                        <div className="flex-shrink-0 relative">
                                            <Image
                                                src={item.image || 'https://placehold.co/200'}
                                                alt={item.name}
                                                width={64}
                                                height={64}
                                                className="w-16 h-16 rounded-lg object-center object-cover border border-border bg-secondary"
                                            />
                                            <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                                                {item.quantity}
                                            </span>
                                        </div>
                                        <div className="ml-4 flex-1">
                                            <h3 className="text-sm font-medium text-foreground">{item.name}</h3>
                                            <p className="text-xs text-muted-foreground mt-1">Size: {item.size}</p>
                                            <p className="text-sm font-medium text-foreground mt-1">${item.price}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>

                            <dl className="mt-6 space-y-4 border-t border-border pt-6">
                                <div className="flex items-center justify-between">
                                    <dt className="text-sm text-muted-foreground">Subtotal</dt>
                                    <dd className="text-sm font-medium text-foreground">${cartTotal.toFixed(2)}</dd>
                                </div>
                                <div className="flex items-center justify-between">
                                    <dt className="text-sm text-muted-foreground">Shipping</dt>
                                    <dd className="text-sm font-medium text-foreground">
                                        {shippingCost === 0 ? <span className="text-green-600">Free</span> : `$${shippingCost.toFixed(2)}`}
                                    </dd>
                                </div>
                                <div className="flex items-center justify-between border-t border-border pt-4">
                                    <dt className="text-lg font-bold text-foreground">Total</dt>
                                    <dd className="text-2xl font-bold text-primary">${total.toFixed(2)}</dd>
                                </div>
                            </dl>

                            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                                <Lock className="h-3 w-3" />
                                <span>Payments are secure and encrypted</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
