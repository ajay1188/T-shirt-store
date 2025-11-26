import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, Package, ShoppingBag, LogOut, Layers, Bell, Search, Users, FileText } from 'lucide-react';
import clsx from 'clsx';

export default function AdminLayout() {
    const { logout, user } = useAuth();
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
        { path: '/users', icon: Users, label: 'Users' },
        { path: '/reports', icon: FileText, label: 'Reports' },
    ];

    const getPageTitle = () => {
        if (location.pathname === '/') return 'Dashboard';
        const path = location.pathname.split('/')[1];
        return path.charAt(0).toUpperCase() + path.slice(1);
    };

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <div className="w-72 bg-gradient-to-b from-indigo-900 via-purple-900 to-indigo-900 text-white flex flex-col shadow-2xl relative overflow-hidden">
                {/* Decorative Background */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500 rounded-full filter blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500 rounded-full filter blur-3xl"></div>
                </div>

                {/* Logo */}
                <div className="relative p-8 border-b border-white/10">
                    <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">
                        LOOMSPACE
                    </h1>
                    <p className="text-indigo-200 text-xs uppercase tracking-widest mt-2 font-medium">Admin Panel</p>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 py-6 space-y-1 relative scrollbar-thin overflow-y-auto">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={clsx(
                                    "flex items-center px-4 py-3.5 rounded-xl transition-all duration-300 group relative overflow-hidden",
                                    isActive
                                        ? "bg-white text-indigo-600 shadow-lg shadow-indigo-900/30"
                                        : "text-indigo-100 hover:bg-white/10 hover:text-white"
                                )}
                            >
                                {isActive && (
                                    <div className="absolute inset-0 bg-gradient-to-r from-white to-indigo-50 opacity-100"></div>
                                )}
                                <Icon className={clsx(
                                    "h-5 w-5 mr-3 transition-all duration-300 relative z-10",
                                    isActive ? "text-indigo-600" : "text-indigo-300 group-hover:text-white group-hover:scale-110"
                                )} />
                                <span className={clsx(
                                    "font-semibold relative z-10 transition-all duration-300",
                                    isActive ? "text-indigo-900" : "group-hover:translate-x-1"
                                )}>
                                    {item.label}
                                </span>
                                {isActive && (
                                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-indigo-600 rounded-l-full"></div>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* User Profile & Logout */}
                <div className="relative p-4 border-t border-white/10 space-y-2">
                    {/* User Profile */}
                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-bold shadow-lg">
                            {user?.name?.charAt(0).toUpperCase() || 'A'}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-white truncate">{user?.name || 'Admin'}</p>
                            <p className="text-xs text-indigo-200 truncate">{user?.email || 'admin@example.com'}</p>
                        </div>
                    </div>

                    {/* Logout Button */}
                    <button
                        onClick={handleLogout}
                        className="flex items-center px-4 py-3 text-red-200 hover:text-white w-full hover:bg-red-500/20 rounded-xl transition-all duration-300 group border border-transparent hover:border-red-400/30"
                    >
                        <LogOut className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform" />
                        <span className="font-semibold">Logout</span>
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto">
                {/* Header */}
                <header className="bg-white shadow-sm border-b border-gray-200 px-8 py-5 flex justify-between items-center sticky top-0 z-10 backdrop-blur-sm bg-white/95">
                    <div>
                        <h2 className="text-2xl font-bold text-gradient">{getPageTitle()}</h2>
                        <p className="text-sm text-gray-500 mt-1">Manage your store efficiently</p>
                    </div>
                    <div className="flex items-center gap-4">
                        {/* Search */}
                        <div className="relative hidden md:block">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none w-64"
                            />
                        </div>

                        {/* Notifications */}
                        <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors" aria-label="Notifications">
                            <Bell className="h-5 w-5 text-gray-600" />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>

                        {/* User Avatar */}
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg cursor-pointer hover:shadow-xl transition-shadow">
                            {user?.name?.charAt(0).toUpperCase() || 'A'}
                        </div>
                    </div>
                </header>

                {/* Main Content Area */}
                <main className="p-8 max-w-7xl mx-auto">
                    <div className="animate-fadeIn">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}
