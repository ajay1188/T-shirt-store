import { useState } from 'react';
import { FileText, Download, Calendar, DollarSign, TrendingUp, Package } from 'lucide-react';

export default function Reports() {
    const [dateRange, setDateRange] = useState('7d');
    const [reportType, setReportType] = useState('sales');

    // Mock data (in production, fetch from API)
    const salesSummary = {
        totalRevenue: 15420,
        totalOrders: 234,
        avgOrderValue: 65.90,
        topProduct: 'Classic White Tee',
    };

    const exportToCSV = () => {
        // Mock CSV export
        const csvData = [
            ['Date', 'Orders', 'Revenue', 'Products Sold'],
            ['2025-01-20', '45', '$2,340', '120'],
            ['2025-01-21', '52', '$2,680', '145'],
            ['2025-01-22', '38', '$1,950', '98'],
        ];

        const csvContent = csvData.map(row => row.join(',')).join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `sales-report-${dateRange}.csv`;
        a.click();
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gradient">Sales Reports</h1>
                    <p className="text-gray-500 mt-1">Generate and export detailed reports</p>
                </div>
                <button
                    onClick={exportToCSV}
                    className="btn-primary flex items-center gap-2"
                >
                    <Download className="h-5 w-5" />
                    Export to CSV
                </button>
            </div>

            {/* Filters */}
            <div className="card p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Date Range
                        </label>
                        <select
                            value={dateRange}
                            onChange={(e) => setDateRange(e.target.value)}
                            className="input"
                            aria-label="Date Range"
                        >
                            <option value="7d">Last 7 Days</option>
                            <option value="30d">Last 30 Days</option>
                            <option value="90d">Last 90 Days</option>
                            <option value="custom">Custom Range</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Report Type
                        </label>
                        <select
                            value={reportType}
                            onChange={(e) => setReportType(e.target.value)}
                            className="input"
                            aria-label="Report Type"
                        >
                            <option value="sales">Sales Summary</option>
                            <option value="products">Product Performance</option>
                            <option value="customers">Customer Insights</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="card p-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-green-100 rounded-lg">
                            <DollarSign className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 font-medium">Total Revenue</p>
                            <p className="text-2xl font-bold text-gray-900">
                                ${salesSummary.totalRevenue.toLocaleString()}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="card p-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-100 rounded-lg">
                            <FileText className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 font-medium">Total Orders</p>
                            <p className="text-2xl font-bold text-gray-900">{salesSummary.totalOrders}</p>
                        </div>
                    </div>
                </div>
                <div className="card p-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-purple-100 rounded-lg">
                            <TrendingUp className="h-6 w-6 text-purple-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 font-medium">Avg Order Value</p>
                            <p className="text-2xl font-bold text-gray-900">
                                ${salesSummary.avgOrderValue}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="card p-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-pink-100 rounded-lg">
                            <Package className="h-6 w-6 text-pink-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 font-medium">Top Product</p>
                            <p className="text-lg font-bold text-gray-900 truncate">
                                {salesSummary.topProduct}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Report Table */}
            <div className="card overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-bold text-gray-900">Detailed Report</h3>
                    <p className="text-sm text-gray-500 mt-1">Daily breakdown for the selected period</p>
                </div>
                <div className="overflow-x-auto">
                    <table className="table-modern">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Orders</th>
                                <th>Revenue</th>
                                <th>Products Sold</th>
                                <th>Avg Order</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                { date: '2025-01-20', orders: 45, revenue: 2340, products: 120, avg: 52.00 },
                                { date: '2025-01-21', orders: 52, revenue: 2680, products: 145, avg: 51.54 },
                                { date: '2025-01-22', orders: 38, revenue: 1950, products: 98, avg: 51.32 },
                                { date: '2025-01-23', orders: 48, revenue: 2450, products: 128, avg: 51.04 },
                                { date: '2025-01-24', orders: 51, revenue: 3000, products: 152, avg: 58.82 },
                            ].map((row, index) => (
                                <tr key={index}>
                                    <td>
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4 text-gray-400" />
                                            {new Date(row.date).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric'
                                            })}
                                        </div>
                                    </td>
                                    <td className="font-semibold">{row.orders}</td>
                                    <td className="font-bold text-green-600">${row.revenue.toLocaleString()}</td>
                                    <td>{row.products}</td>
                                    <td className="text-gray-600">${row.avg.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Export Options */}
            <div className="card p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Export Options</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button className="btn-secondary flex items-center justify-center gap-2">
                        <Download className="h-5 w-5" />
                        Export as CSV
                    </button>
                    <button className="btn-secondary flex items-center justify-center gap-2">
                        <Download className="h-5 w-5" />
                        Export as PDF
                    </button>
                    <button className="btn-secondary flex items-center justify-center gap-2">
                        <Download className="h-5 w-5" />
                        Export as Excel
                    </button>
                </div>
            </div>
        </div>
    );
}
