import { useState, useEffect } from 'react';
import api from '../lib/api';
import { DollarSign, ShoppingBag, Package, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import clsx from 'clsx';

export default function Dashboard() {
    const [stats, setStats] = useState({ totalOrders: 0, totalProducts: 0, totalRevenue: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await api.get('/admin/dashboard');
                setStats(res.data);
            } catch (error) {
                console.error('Failed to fetch dashboard stats', error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) return (
        <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
    );

    const statCards = [
        { title: 'Total Revenue', value: `$${stats.totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'bg-green-500', trend: '+12.5%', trendUp: true },
        { title: 'Total Orders', value: stats.totalOrders, icon: ShoppingBag, color: 'bg-blue-500', trend: '+5.2%', trendUp: true },
        { title: 'Total Products', value: stats.totalProducts, icon: Package, color: 'bg-purple-500', trend: '-2.1%', trendUp: false },
    ];

    return (
        <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {statCards.map((stat, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 transition-all hover:shadow-md">
                        <div className="flex items-center justify-between mb-4">
                            <div className={clsx("p-3 rounded-lg text-white shadow-lg", stat.color)}>
                                <stat.icon className="h-6 w-6" />
                            </div>
                            <div className={clsx("flex items-center text-sm font-medium", stat.trendUp ? "text-green-600" : "text-red-600")}>
                                {stat.trendUp ? <ArrowUpRight className="h-4 w-4 mr-1" /> : <ArrowDownRight className="h-4 w-4 mr-1" />}
                                {stat.trend}
                            </div>
                        </div>
                        <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">{stat.title}</h3>
                        <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Recent Activity Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-gray-900">Recent Activity</h3>
                        <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">View All</button>
                    </div>
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                <div className="flex items-center">
                                    <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold mr-4">
                                        JD
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">John Doe placed an order</p>
                                        <p className="text-xs text-gray-500">2 minutes ago</p>
                                    </div>
                                </div>
                                <span className="text-sm font-bold text-gray-900">$120.00</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-gray-900">Popular Products</h3>
                        <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">View All</button>
                    </div>
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center p-2 hover:bg-gray-50 rounded-lg transition-colors">
                                <div className="h-12 w-12 bg-gray-200 rounded-md mr-4"></div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-900">Classic White Tee</p>
                                    <p className="text-xs text-gray-500">24 sales this week</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-bold text-gray-900">$29.99</p>
                                    <p className="text-xs text-green-600">+12%</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
