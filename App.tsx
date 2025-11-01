
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { CartProvider } from './context/CartContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import CheckoutPage from './pages/CheckoutPage';

import AdminDashboard from './pages/admin/AdminDashboard';
import ManageMenuPage from './pages/admin/ManageMenuPage';
import ManageOrdersPage from './pages/admin/ManageOrdersPage';
import ManageCustomersPage from './pages/admin/ManageCustomersPage';

import ProtectedRoute from './components/ProtectedRoute';

const App: React.FC = () => {
    const location = useLocation();
    const isAdminRoute = location.pathname.startsWith('/admin');

    return (
        <AuthProvider>
            <DataProvider>
                <CartProvider>
                    <div className="flex flex-col min-h-screen">
                        {!isAdminRoute && <Navbar />}
                        <main className="flex-grow">
                            <Routes>
                                {/* Customer Routes */}
                                <Route path="/" element={<HomePage />} />
                                <Route path="/menu" element={<MenuPage />} />
                                <Route path="/about" element={<AboutPage />} />
                                <Route path="/contact" element={<ContactPage />} />
                                <Route path="/login" element={<LoginPage />} />
                                <Route path="/register" element={<RegisterPage />} />
                                <Route path="/checkout" element={<CheckoutPage />} />
                                <Route 
                                    path="/order-history" 
                                    element={
                                        <ProtectedRoute roles={['customer']}>
                                            <OrderHistoryPage />
                                        </ProtectedRoute>
                                    } 
                                />

                                {/* Admin Routes */}
                                <Route 
                                    path="/admin/dashboard" 
                                    element={
                                        <ProtectedRoute roles={['admin']}>
                                            <AdminDashboard />
                                        </ProtectedRoute>
                                    } 
                                />
                                <Route 
                                    path="/admin/menu" 
                                    element={
                                        <ProtectedRoute roles={['admin']}>
                                            <ManageMenuPage />
                                        </ProtectedRoute>
                                    } 
                                />
                                <Route 
                                    path="/admin/orders" 
                                    element={
                                        <ProtectedRoute roles={['admin']}>
                                            <ManageOrdersPage />
                                        </ProtectedRoute>
                                    } 
                                />
                                <Route 
                                    path="/admin/customers" 
                                    element={
                                        <ProtectedRoute roles={['admin']}>
                                            <ManageCustomersPage />
                                        </ProtectedRoute>
                                    } 
                                />
                            </Routes>
                        </main>
                        {!isAdminRoute && <Footer />}
                    </div>
                </CartProvider>
            </DataProvider>
        </AuthProvider>
    );
};

export default App;
