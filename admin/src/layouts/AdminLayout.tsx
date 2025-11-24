import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, Package, ShoppingBag, LogOut, Layers, Settings } from 'lucide-react';
import clsx from 'clsx';

export default function AdminLayout() {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navItems = [
        { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
        { path: '/products', icon: Package, label: 'Products' },
        { path: '/orders', icon: ShoppingBag, label: 'Orders' },
        { path: '/categories', icon: Layers, label: 'Categories' },
    ];

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-64 bg-gray-900 text-white flex flex-col shadow-xl">
                <div className="p-6 border-b border-gray-800">
                    <h1 className="text-2xl font-bold tracking-wider text-indigo-500">LOOMSPACE</h1>
                    <p className="text-gray-400 text-xs uppercase tracking-widest mt-1">Admin Panel</p>
                </div>
                <nav className="flex-1 px-4 py-6 space-y-2">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={clsx(
                                    "flex items-center px-4 py-3 rounded-lg transition-all duration-200 group",
                                    isActive
                                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-900/50"
                                        : "text-gray-400 hover:bg-gray-800 hover:text-white"
                                )}
                            >
                                <Icon className={clsx("h-5 w-5 mr-3 transition-colors", isActive ? "text-white" : "text-gray-500 group-hover:text-white")} />
                                <span className="font-medium">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>
                <div className="p-4 border-t border-gray-800">
                    <button className="flex items-center px-4 py-3 text-gray-400 hover:text-white w-full hover:bg-gray-800 rounded-lg transition-colors mb-2">
                        <Settings className="h-5 w-5 mr-3" />
                        Settings
                    </button>
                    <button onClick={handleLogout} className="flex items-center px-4 py-3 text-red-400 hover:text-red-300 w-full hover:bg-red-900/20 rounded-lg transition-colors">
                        <LogOut className="h-5 w-5 mr-3" />
                        Logout
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto bg-gray-50">
                <header className="bg-white shadow-sm border-b border-gray-200 px-8 py-4 flex justify-between items-center sticky top-0 z-10">
                    <h2 className="text-xl font-semibold text-gray-800 capitalize">
                        {location.pathname === '/' ? 'Dashboard' : location.pathname.split('/')[1]}
                    </h2>
                    <div className="flex items-center space-x-4">
                        <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                            A
                        </div>
                    </div>
                </header>
                <main className="p-8 max-w-7xl mx-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
