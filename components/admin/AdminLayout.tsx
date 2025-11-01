
import React, { ReactNode } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ChartPieIcon, ClipboardDocumentListIcon, UsersIcon, RectangleStackIcon, ArrowRightOnRectangleIcon, HomeIcon } from '../Icons';

const AdminLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
        `flex items-center px-4 py-3 rounded-lg transition-colors duration-200 ${
            isActive ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-200'
        }`;

    return (
        <div className="flex h-screen bg-gray-100">
            <aside className="w-64 bg-surface shadow-lg flex flex-col">
                <div className="flex items-center justify-center h-20 border-b">
                    <h1 className="text-2xl font-bold text-primary">Admin Panel</h1>
                </div>
                <nav className="flex-grow px-4 py-6 space-y-2">
                    <NavLink to="/admin/dashboard" className={navLinkClasses}>
                        <ChartPieIcon />
                        <span className="ml-3">Dashboard</span>
                    </NavLink>
                    <NavLink to="/admin/menu" className={navLinkClasses}>
                        <RectangleStackIcon />
                        <span className="ml-3">Manage Menu</span>
                    </NavLink>
                    <NavLink to="/admin/orders" className={navLinkClasses}>
                        <ClipboardDocumentListIcon />
                        <span className="ml-3">Manage Orders</span>
                    </NavLink>
                    <NavLink to="/admin/customers" className={navLinkClasses}>
                        <UsersIcon />
                        <span className="ml-3">Manage Customers</span>
                    </NavLink>
                </nav>
                <div className="px-4 py-6 border-t">
                     <NavLink to="/" className={navLinkClasses({isActive: false})}>
                        <HomeIcon />
                        <span className="ml-3">Back to Site</span>
                    </NavLink>
                    <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-3 text-gray-600 rounded-lg hover:bg-gray-200 mt-2"
                    >
                        <ArrowRightOnRectangleIcon />
                        <span className="ml-3">Logout</span>
                    </button>
                </div>
            </aside>
            <div className="flex-1 flex flex-col overflow-hidden">
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-8">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
