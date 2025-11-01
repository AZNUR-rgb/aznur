
import React, { useMemo } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { Order, OrderStatus } from '../types';
import { Link } from 'react-router-dom';

const OrderHistoryPage: React.FC = () => {
    const { orders, isLoading } = useData();
    const { user } = useAuth();

    const userOrders = useMemo(() => {
        if (!user) return [];
        return orders
            .filter(order => order.userId === user.id)
            .sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime());
    }, [orders, user]);

    const getStatusColor = (status: OrderStatus) => {
        switch (status) {
            case OrderStatus.Completed: return 'bg-green-100 text-green-800';
            case OrderStatus.InProgress: return 'bg-blue-100 text-blue-800';
            case OrderStatus.Pending: return 'bg-yellow-100 text-yellow-800';
            case OrderStatus.Cancelled: return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };
    
    if (isLoading) return <p className="text-center py-10">Loading your orders...</p>;
    
    if (!userOrders.length) {
        return (
             <div className="container mx-auto text-center py-20">
                <h1 className="text-2xl font-bold">You have no past orders.</h1>
                <Link to="/menu" className="mt-4 inline-block bg-primary text-white py-2 px-6 rounded-md">
                    Start Ordering
                </Link>
            </div>
        )
    }

    return (
        <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-extrabold text-center mb-10">My Order History</h1>
            <div className="space-y-6">
                {userOrders.map((order: Order) => (
                    <div key={order.id} className="bg-white p-6 rounded-lg shadow-lg">
                        <div className="flex flex-wrap justify-between items-start mb-4">
                            <div>
                                <h2 className="text-xl font-bold">Order #{order.id}</h2>
                                <p className="text-sm text-gray-500">Date: {new Date(order.orderDate).toLocaleDateString()}</p>
                            </div>
                            <div className="text-right">
                                <p className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(order.status)}`}>
                                    {order.status}
                                </p>
                                <p className="text-lg font-bold mt-1">Total: RM{order.totalPrice.toFixed(2)}</p>
                            </div>
                        </div>
                        <div className="border-t pt-4">
                            <h3 className="font-semibold mb-2">Items:</h3>
                            <ul className="space-y-2">
                                {order.items.map(item => (
                                    <li key={item.id} className="flex justify-between text-sm">
                                        <span>{item.menuItem.name} x {item.quantity}</span>
                                        <span className="text-gray-600">RM{item.subtotal.toFixed(2)}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrderHistoryPage;
