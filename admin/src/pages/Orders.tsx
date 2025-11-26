import { useEffect, useState } from 'react';
import api from '../lib/api';
import { Edit, Package, Clock, CheckCircle, XCircle, Truck } from 'lucide-react';

interface Order {
    id: string;
    total: number;
    status: string;
    createdAt: string;
    user: {
        name: string;
        email: string;
    };
}

const STATUS_OPTIONS = ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'];

const STATUS_CONFIG = {
    PENDING: { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', icon: Clock },
    PROCESSING: { color: 'bg-blue-100 text-blue-800 border-blue-200', icon: Package },
    SHIPPED: { color: 'bg-purple-100 text-purple-800 border-purple-200', icon: Truck },
    DELIVERED: { color: 'bg-green-100 text-green-800 border-green-200', icon: CheckCircle },
    CANCELLED: { color: 'bg-red-100 text-red-800 border-red-200', icon: XCircle },
};

export default function Orders() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [showStatusModal, setShowStatusModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [newStatus, setNewStatus] = useState('');

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await api.get('/admin/orders');
            setOrders(res.data);
        } catch (error) {
            console.error('Failed to fetch orders', error);
        } finally {
            setLoading(false);
        }
    };

    const handleEditStatus = (order: Order) => {
        setSelectedOrder(order);
        setNewStatus(order.status);
        setShowStatusModal(true);
    };

    const handleUpdateStatus = async () => {
        if (!selectedOrder) return;
        try {
            await api.put(`/admin/orders/${selectedOrder.id}`, { status: newStatus });
            setShowStatusModal(false);
            fetchOrders();
        } catch (error) {
            console.error('Failed to update order status', error);
            alert('Failed to update order status');
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center h-64">
            <div className="relative">
                <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
            </div>
        </div>
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gradient">Orders</h1>
                <p className="text-gray-500 mt-1">Manage customer orders and track status</p>
            </div>

            {/* Orders Table */}
            <div className="card overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="table-modern">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Customer</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Total</th>
                                <th className="text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => {
                                const StatusIcon = STATUS_CONFIG[order.status as keyof typeof STATUS_CONFIG]?.icon || Clock;
                                const statusColor = STATUS_CONFIG[order.status as keyof typeof STATUS_CONFIG]?.color || 'bg-gray-100 text-gray-800';

                                return (
                                    <tr key={order.id} className="group">
                                        <td>
                                            <span className="font-mono text-sm font-semibold text-indigo-600">
                                                #{order.id.slice(0, 8)}
                                            </span>
                                        </td>
                                        <td>
                                            <div>
                                                <div className="font-semibold text-gray-900">{order.user.name}</div>
                                                <div className="text-xs text-gray-500">{order.user.email}</div>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="text-sm text-gray-600">
                                                {new Date(order.createdAt).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: 'numeric'
                                                })}
                                            </span>
                                        </td>
                                        <td>
                                            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${statusColor}`}>
                                                <StatusIcon className="h-3.5 w-3.5" />
                                                {order.status}
                                            </span>
                                        </td>
                                        <td>
                                            <span className="text-lg font-bold text-gray-900">
                                                ${order.total.toFixed(2)}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="flex items-center justify-end">
                                                <button
                                                    onClick={() => handleEditStatus(order)}
                                                    className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all hover:scale-110"
                                                    aria-label="Edit order status"
                                                >
                                                    <Edit className="h-5 w-5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {orders.length === 0 && (
                    <div className="p-12 text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                            <Package className="h-8 w-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No orders yet</h3>
                        <p className="text-gray-500">Orders will appear here once customers start purchasing</p>
                    </div>
                )}
            </div>

            {/* Status Update Modal */}
            {showStatusModal && selectedOrder && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md animate-fadeIn">
                        {/* Header */}
                        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-5 rounded-t-2xl">
                            <h2 className="text-xl font-bold">Update Order Status</h2>
                            <p className="text-indigo-100 text-sm mt-1">Order #{selectedOrder.id.slice(0, 8)}</p>
                        </div>

                        {/* Content */}
                        <div className="p-6 space-y-4">
                            <div>
                                <label htmlFor="status-select" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Order Status
                                </label>
                                <select
                                    id="status-select"
                                    value={newStatus}
                                    onChange={(e) => setNewStatus(e.target.value)}
                                    className="input"
                                >
                                    {STATUS_OPTIONS.map((status) => (
                                        <option key={status} value={status}>
                                            {status}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3 pt-2">
                                <button
                                    onClick={() => setShowStatusModal(false)}
                                    className="btn-secondary flex-1"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleUpdateStatus}
                                    className="btn-primary flex-1"
                                >
                                    Update Status
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
