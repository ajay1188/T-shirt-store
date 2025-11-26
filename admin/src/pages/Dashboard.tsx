import { useState, useEffect } from 'react';
import api from '../lib/api';
import { DollarSign, ShoppingBag, Package, TrendingUp, TrendingDown, Users, Eye, BarChart3, RefreshCw } from 'lucide-react';
import clsx from 'clsx';
import { SalesTrendChart, RevenueChart, OrderStatusChart, CategoryChart } from '../components/ChartComponents';

export default function Dashboard() {
    const [stats, setStats] = useState({ totalOrders: 0, totalProducts: 0, totalRevenue: 0 });
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    // Mock data for charts (in production, fetch from API)
    const salesTrendData = [
        { date: 'Mon', sales: 12 },
        { date: 'Tue', sales: 19 },
        { date: 'Wed', sales: 15 },
        { date: 'Thu', sales: 25 },
        { date: 'Fri', sales: 22 },
        { date: 'Sat', sales: 30 },
        { date: 'Sun', sales: 28 },
    ];

    const revenueData = [
        { date: 'Mon', revenue: 450 },
        { date: 'Tue', revenue: 680 },
        { date: 'Wed', revenue: 520 },
        { date: 'Thu', revenue: 890 },
        { date: 'Fri', revenue: 750 },
        { date: 'Sat', revenue: 1100 },
        { date: 'Sun', revenue: 980 },
    ];

    const orderStatusData = [
        { name: 'Pending', value: 12 },
        { name: 'Processing', value: 25 },
        { name: 'Shipped', value: 18 },
        { name: 'Delivered', value: 45 },
    ];

    const categoryData = [
        { name: 'T-Shirts', products: 45, sales: 120 },
        { name: 'Hoodies', products: 28, sales: 85 },
        { name: 'Accessories', products: 32, sales: 65 },
    ];

    useEffect(() => {
        fetchStats();
        // Auto-refresh every 30 seconds
        const interval = setInterval(() => {
            fetchStats(true);
        }, 30000);
        return () => clearInterval(interval);
    }, []);

    const fetchStats = async (isRefresh = false) => {
        if (isRefresh) setRefreshing(true);
        try {
            const res = await api.get('/admin/dashboard');
            setStats(res.data);
        } catch (error) {
            console.error('Failed to fetch dashboard stats', error);
        } finally {
            setLoading(false);
            if (isRefresh) setRefreshing(false);
        }
    };

    const handleRefresh = () => {
        fetchStats(true);
    };

    if (loading) return (
        <div className="flex items-center justify-center h-64">
            <div className="relative">
                <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 bg-indigo-600 rounded-full animate-pulse"></div>
                </div>
            </div>
        </div>
    );

    const statCards = [
        {
            title: 'Total Revenue',
            value: `$${stats.totalRevenue.toLocaleString()}`,
            icon: DollarSign,
            gradient: 'from-emerald-500 to-teal-600',
            bgGradient: 'from-emerald-50 to-teal-50',
            iconBg: 'bg-emerald-500',
            trend: '+12.5%',
            trendUp: true,
            comparison: '+$2,400 vs last week'
        },
        {
            title: 'Total Orders',
            value: stats.totalOrders,
            icon: ShoppingBag,
            gradient: 'from-blue-500 to-indigo-600',
            bgGradient: 'from-blue-50 to-indigo-50',
            iconBg: 'bg-blue-500',
            trend: '+5.2%',
            trendUp: true,
            comparison: '+12 orders vs last week'
        },
        {
            title: 'Total Products',
            value: stats.totalProducts,
            icon: Package,
            gradient: 'from-purple-500 to-pink-600',
            bgGradient: 'from-purple-50 to-pink-50',
            iconBg: 'bg-purple-500',
            trend: '+8.1%',
            trendUp: true,
            comparison: '+6 products added'
        },
    ];

    const recentActivities = [
        { id: 1, user: 'John Doe', action: 'placed an order', amount: '$120.00', time: '2 minutes ago', avatar: 'JD' },
        { id: 2, user: 'Jane Smith', action: 'placed an order', amount: '$85.50', time: '15 minutes ago', avatar: 'JS' },
        { id: 3, user: 'Mike Johnson', action: 'placed an order', amount: '$200.00', time: '1 hour ago', avatar: 'MJ' },
    ];

    const popularProducts = [
        { id: 1, name: 'Classic White Tee', sales: 24, price: '$29.99', trend: '+12%', image: 'https://placehold.co/100' },
        { id: 2, name: 'Black Hoodie', sales: 18, price: '$49.99', trend: '+8%', image: 'https://placehold.co/100' },
        { id: 3, name: 'Vintage Denim', sales: 15, price: '$39.99', trend: '+5%', image: 'https://placehold.co/100' },
    ];

    return (
        <div className="space-y-8">
            {/* Header with Refresh */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gradient">Dashboard</h1>
                    <p className="text-gray-500 mt-1">Welcome back! Here's what's happening today.</p>
                </div>
                <button
                    onClick={handleRefresh}
                    disabled={refreshing}
                    className="btn-secondary flex items-center gap-2"
                >
                    <RefreshCw className={clsx("h-5 w-5", refreshing && "animate-spin")} />
                    Refresh
                </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {statCards.map((stat, index) => (
                    <div
                        key={index}
                        className={clsx(
                            "relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 cursor-pointer group",
                            "bg-gradient-to-br", stat.bgGradient, "border border-white shadow-lg"
                        )}
                    >
                        {/* Decorative Circle */}
                        <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-white/20 group-hover:scale-150 transition-transform duration-500"></div>

                        <div className="relative z-10">
                            {/* Icon and Trend */}
                            <div className="flex items-start justify-between mb-4">
                                <div className={clsx(
                                    "p-3 rounded-xl shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300",
                                    stat.iconBg
                                )}>
                                    <stat.icon className="h-6 w-6 text-white" />
                                </div>
                                <div className={clsx(
                                    "flex items-center gap-1 px-3 py-1 rounded-full text-sm font-bold",
                                    stat.trendUp ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                                )}>
                                    {stat.trendUp ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                                    {stat.trend}
                                </div>
                            </div>

                            {/* Title and Value */}
                            <h3 className="text-gray-600 text-sm font-semibold uppercase tracking-wider mb-2">
                                {stat.title}
                            </h3>
                            <p className="text-4xl font-bold bg-gradient-to-r bg-clip-text text-transparent from-gray-800 to-gray-600 mb-2">
                                {stat.value}
                            </p>
                            <p className="text-xs text-gray-500">{stat.comparison}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Analytics Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Sales Trend */}
                <div className="card p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                <BarChart3 className="h-5 w-5 text-indigo-600" />
                                Sales Trend
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">Last 7 days performance</p>
                        </div>
                    </div>
                    <SalesTrendChart data={salesTrendData} />
                </div>

                {/* Revenue Chart */}
                <div className="card p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                <DollarSign className="h-5 w-5 text-green-600" />
                                Revenue Overview
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">Weekly revenue trend</p>
                        </div>
                    </div>
                    <RevenueChart data={revenueData} />
                </div>

                {/* Order Status Distribution */}
                <div className="card p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-xl font-bold text-gray-900">Order Status</h3>
                            <p className="text-sm text-gray-500 mt-1">Current order distribution</p>
                        </div>
                    </div>
                    <OrderStatusChart data={orderStatusData} />
                </div>

                {/* Category Performance */}
                <div className="card p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-xl font-bold text-gray-900">Category Performance</h3>
                            <p className="text-sm text-gray-500 mt-1">Products and sales by category</p>
                        </div>
                    </div>
                    <CategoryChart data={categoryData} />
                </div>
            </div>

            {/* Recent Activity & Popular Products */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Activity */}
                <div className="card p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-xl font-bold text-gray-900">Recent Activity</h3>
                            <p className="text-sm text-gray-500 mt-1">Latest customer orders</p>
                        </div>
                        <button className="text-sm text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                            View All
                            <TrendingUp className="h-4 w-4" />
                        </button>
                    </div>
                    <div className="space-y-3">
                        {recentActivities.map((activity) => (
                            <div
                                key={activity.id}
                                className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl hover:from-indigo-50 hover:to-purple-50 transition-all duration-300 border border-gray-100 hover:border-indigo-200 group cursor-pointer"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-110 transition-transform">
                                        {activity.avatar}
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">
                                            {activity.user} <span className="text-gray-500 font-normal">{activity.action}</span>
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                                    </div>
                                </div>
                                <span className="text-lg font-bold text-gray-900">{activity.amount}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Popular Products */}
                <div className="card p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-xl font-bold text-gray-900">Popular Products</h3>
                            <p className="text-sm text-gray-500 mt-1">Top selling items this week</p>
                        </div>
                        <button className="text-sm text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                            View All
                            <Eye className="h-4 w-4" />
                        </button>
                    </div>
                    <div className="space-y-3">
                        {popularProducts.map((product) => (
                            <div
                                key={product.id}
                                className="flex items-center gap-4 p-3 hover:bg-gradient-to-r hover:from-gray-50 hover:to-white rounded-xl transition-all duration-300 group cursor-pointer border border-transparent hover:border-gray-200"
                            >
                                <div className="relative">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-16 h-16 rounded-lg object-cover shadow-md group-hover:shadow-xl transition-shadow"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                                        {product.name}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">{product.sales} sales this week</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-bold text-gray-900">{product.price}</p>
                                    <p className="text-xs text-green-600 font-semibold mt-1">{product.trend}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Quick Stats Bar */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: 'Conversion Rate', value: '3.2%', icon: TrendingUp, color: 'text-green-600' },
                    { label: 'Avg Order Value', value: '$85.50', icon: DollarSign, color: 'text-blue-600' },
                    { label: 'Active Users', value: '1,234', icon: Users, color: 'text-purple-600' },
                    { label: 'Page Views', value: '12.5K', icon: Eye, color: 'text-pink-600' },
                ].map((item, index) => (
                    <div key={index} className="card p-4 flex items-center gap-4">
                        <div className={clsx("p-3 rounded-lg bg-gray-50", item.color)}>
                            <item.icon className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 font-medium">{item.label}</p>
                            <p className="text-xl font-bold text-gray-900">{item.value}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
