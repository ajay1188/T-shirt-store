import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Color palette for charts
const COLORS = {
    primary: '#6366f1',
    secondary: '#8b5cf6',
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444',
    info: '#3b82f6',
};

const CHART_COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6'];

// Sales Trend Line Chart
interface SalesTrendData {
    date: string;
    sales: number;
    revenue?: number;
}

export function SalesTrendChart({ data }: { data: SalesTrendData[] }) {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                    dataKey="date"
                    stroke="#6b7280"
                    style={{ fontSize: '12px' }}
                />
                <YAxis
                    stroke="#6b7280"
                    style={{ fontSize: '12px' }}
                />
                <Tooltip
                    contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                    }}
                />
                <Legend />
                <Line
                    type="monotone"
                    dataKey="sales"
                    stroke={COLORS.primary}
                    strokeWidth={3}
                    dot={{ fill: COLORS.primary, r: 4 }}
                    activeDot={{ r: 6 }}
                />
            </LineChart>
        </ResponsiveContainer>
    );
}

// Revenue Area Chart
interface RevenueData {
    date: string;
    revenue: number;
}

export function RevenueChart({ data }: { data: RevenueData[] }) {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data}>
                <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={COLORS.success} stopOpacity={0.8} />
                        <stop offset="95%" stopColor={COLORS.success} stopOpacity={0.1} />
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                    dataKey="date"
                    stroke="#6b7280"
                    style={{ fontSize: '12px' }}
                />
                <YAxis
                    stroke="#6b7280"
                    style={{ fontSize: '12px' }}
                />
                <Tooltip
                    contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                    }}
                    formatter={(value: number) => `$${value.toFixed(2)}`}
                />
                <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke={COLORS.success}
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorRevenue)"
                />
            </AreaChart>
        </ResponsiveContainer>
    );
}

// Order Status Pie Chart
interface OrderStatusData {
    name: string;
    value: number;
}

export function OrderStatusChart({ data }: { data: OrderStatusData[] }) {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <PieChart>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent ? (percent * 100).toFixed(0) : "0")} %`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                >
                    {data.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip
                    contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                    }}
                />
            </PieChart>
        </ResponsiveContainer>
    );
}



// Category Distribution Bar Chart
interface CategoryData {
    name: string;
    products: number;
    sales: number;
}

export function CategoryChart({ data }: { data: CategoryData[] }) {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                    dataKey="name"
                    stroke="#6b7280"
                    style={{ fontSize: '12px' }}
                />
                <YAxis
                    stroke="#6b7280"
                    style={{ fontSize: '12px' }}
                />
                <Tooltip
                    contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                    }}
                />
                <Legend />
                <Bar dataKey="products" fill={COLORS.primary} radius={[8, 8, 0, 0]} />
                <Bar dataKey="sales" fill={COLORS.secondary} radius={[8, 8, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>
    );
}

// Mini Sparkline Chart for stat cards
interface SparklineData {
    value: number;
}

export function SparklineChart({ data, color = COLORS.primary }: { data: SparklineData[], color?: string }) {
    return (
        <ResponsiveContainer width="100%" height={40}>
            <LineChart data={data}>
                <Line
                    type="monotone"
                    dataKey="value"
                    stroke={color}
                    strokeWidth={2}
                    dot={false}
                />
            </LineChart>
        </ResponsiveContainer>
    );
}
