
import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { ShoppingCartIcon, UserCircleIcon, ArrowRightOnRectangleIcon, ClipboardDocumentListIcon } from './Icons';
import CartSidebar from './CartSidebar';

const Navbar: React.FC = () => {
    const { user, logout } = useAuth();
    const { itemCount, toggleCart, isCartOpen } = useCart();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
        `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            isActive ? 'bg-primary text-white' : 'text-gray-600 hover:bg-primary hover:text-white'
        }`;

    return (
        <>
            <nav className="bg-surface shadow-md sticky top-0 z-40">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        <div className="flex-shrink-0">
                            <Link to="/" className="text-2xl font-bold text-primary">
                                Restaurant Wanizar
                            </Link>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                <NavLink to="/" className={navLinkClasses}>Home</NavLink>
                                <NavLink to="/menu" className={navLinkClasses}>Menu</NavLink>
                                <NavLink to="/about" className={navLinkClasses}>About Us</NavLink>
                                <NavLink to="/contact" className={navLinkClasses}>Contact</NavLink>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button onClick={toggleCart} className="relative p-2 rounded-full text-gray-600 hover:text-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                                <ShoppingCartIcon />
                                {itemCount > 0 && (
                                    <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">{itemCount}</span>
                                )}
                            </button>
                            {user ? (
                                <div className="relative group">
                                    <button className="flex items-center p-2 rounded-full text-gray-600 hover:text-primary">
                                        <UserCircleIcon />
                                        <span className="ml-2 text-sm font-medium hidden sm:block">{user.username}</span>
                                    </button>
                                    <div className="absolute right-0 mt-2 w-48 bg-surface rounded-md shadow-lg py-1 z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                        {user.role === 'customer' && (
                                            <Link to="/order-history" className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                <ClipboardDocumentListIcon />
                                                <span className="ml-2">Order History</span>
                                            </Link>
                                        )}
                                        <button onClick={handleLogout} className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                            <ArrowRightOnRectangleIcon />
                                            <span className="ml-2">Logout</span>
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <Link to="/login" className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">Login</Link>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
            <CartSidebar isOpen={isCartOpen} toggle={toggleCart} />
        </>
    );
};

export default Navbar;
