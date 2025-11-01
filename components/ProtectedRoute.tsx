
import React, { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AdminLayout from './admin/AdminLayout';

interface ProtectedRouteProps {
  children: ReactElement;
  roles: Array<'admin' | 'customer'>;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, roles }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen"><div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div></div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!roles.includes(user.role)) {
    // Redirect admins trying to access customer pages or vice-versa
    return user.role === 'admin' ? <Navigate to="/admin/dashboard" replace /> : <Navigate to="/" replace />;
  }

  if (user.role === 'admin') {
    return <AdminLayout>{children}</AdminLayout>;
  }

  return children;
};

export default ProtectedRoute;
