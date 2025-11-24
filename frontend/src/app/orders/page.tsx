"use client";

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import Link from 'next/link';

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/orders/my-orders')
            .then(res => {
                setOrders(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="p-8 text-center">Loading...</div>;

    return (
        <div className="bg-white">
            <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-8">Order History</h1>

                {orders.length === 0 ? (
                    <div className="text-center">
                        <p className="text-gray-500">You haven't placed any orders yet.</p>
                        <Link href="/shop" className="text-indigo-600 hover:text-indigo-500 mt-4 inline-block">Start Shopping</Link>
                    </div>
                ) : (
                    <div className="space-y-8">
                        {orders.map((order: any) => (
                            <div key={order.id} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Order ID</p>
                                        <p className="text-sm font-bold text-gray-900">{order.id}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Date</p>
                                        <p className="text-sm font-bold text-gray-900">{new Date(order.createdAt).toLocaleDateString()}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Total</p>
                                        <p className="text-sm font-bold text-gray-900">${Number(order.total).toFixed(2)}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Status</p>
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${order.status === 'DELIVERED' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            {order.status}
                                        </span>
                                    </div>
                                </div>
                                <div className="px-6 py-4">
                                    <ul className="divide-y divide-gray-200">
                                        {order.items.map((item: any) => (
                                            <li key={item.id} className="py-4 flex items-center">
                                                <div className="flex-1">
                                                    <h4 className="text-sm font-medium text-gray-900">{item.product.name}</h4>
                                                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                                </div>
                                                <p className="text-sm font-medium text-gray-900">${Number(item.price).toFixed(2)}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
