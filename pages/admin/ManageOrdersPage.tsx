
import React from 'react';
import { useData } from '../../context/DataContext';
import { Order, OrderStatus } from '../../types';

const ManageOrdersPage: React.FC = () => {
    const { orders, updateOrderStatus } = useData();

    const sortedOrders = [...orders].sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime());

    const handleStatusChange = (orderId: number, status: OrderStatus) => {
        updateOrderStatus(orderId, status);
    };

    const getStatusColor = (status: OrderStatus) => {
        switch (status) {
            case OrderStatus.Completed: return 'bg-green-100 text-green-800';
            case OrderStatus.InProgress: return 'bg-blue-100 text-blue-800';
            case OrderStatus.Pending: return 'bg-yellow-100 text-yellow-800';
            case OrderStatus.Cancelled: return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">Manage Orders</h1>
            <div className="bg-white shadow-md rounded-lg overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">Order ID</th>
                            <th scope="col" className="px-6 py-3">Customer</th>
                            <th scope="col" className="px-6 py-3">Date</th>
                            <th scope="col" className="px-6 py-3">Total</th>
                            <th scope="col" className="px-6 py-3">Status</th>
                            <th scope="col" className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedOrders.map((order: Order) => (
                            <tr key={order.id} className="bg-white border-b hover:bg-gray-50">
                                <td className="px-6 py-4 font-bold text-gray-900">#{order.id}</td>
                                <td className="px-6 py-4">{order.customerName}</td>
                                <td className="px-6 py-4">{new Date(order.orderDate).toLocaleDateString()}</td>
                                <td className="px-6 py-4">RM{order.totalPrice.toFixed(2)}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <select
                                        value={order.status}
                                        onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                                        className="border-gray-300 rounded-md shadow-sm text-sm"
                                    >
                                        {Object.values(OrderStatus).map(status => (
                                            <option key={status} value={status}>{status}</option>
                                        ))}
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageOrdersPage;
