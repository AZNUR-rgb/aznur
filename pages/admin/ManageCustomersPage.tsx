
import React, { useMemo, useState } from 'react';
import { useData } from '../../context/DataContext';
import { User, Order } from '../../types';
import { XMarkIcon } from '../../components/Icons';

const ManageCustomersPage: React.FC = () => {
    const { customers, orders } = useData();
    const [selectedCustomer, setSelectedCustomer] = useState<User | null>(null);

    const customerOrderData = useMemo(() => {
        return customers.map(customer => {
            const customerOrders = orders.filter(order => order.userId === customer.id);
            const totalSpent = customerOrders.reduce((sum, order) => sum + order.totalPrice, 0);
            return {
                ...customer,
                orderCount: customerOrders.length,
                totalSpent: totalSpent
            };
        });
    }, [customers, orders]);

    const customerOrders = useMemo(() => {
        if (!selectedCustomer) return [];
        return orders.filter(order => order.userId === selectedCustomer.id)
            .sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime());
    }, [orders, selectedCustomer]);

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">Manage Customers</h1>

            <div className="bg-white shadow-md rounded-lg overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">Customer ID</th>
                            <th scope="col" className="px-6 py-3">Username</th>
                            <th scope="col" className="px-6 py-3">Total Orders</th>
                            <th scope="col" className="px-6 py-3">Total Spent</th>
                            <th scope="col" className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customerOrderData.map((customer) => (
                            <tr key={customer.id} className="bg-white border-b hover:bg-gray-50">
                                <td className="px-6 py-4">{customer.id}</td>
                                <td className="px-6 py-4 font-medium text-gray-900">{customer.username}</td>
                                <td className="px-6 py-4">{customer.orderCount}</td>
                                <td className="px-6 py-4">RM{customer.totalSpent.toFixed(2)}</td>
                                <td className="px-6 py-4">
                                    <button
                                        onClick={() => setSelectedCustomer(customer)}
                                        className="text-primary hover:underline font-medium"
                                    >
                                        View History
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {selectedCustomer && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
                    <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-3xl max-h-[90vh] flex flex-col">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold">Order History for {selectedCustomer.username}</h2>
                             <button onClick={() => setSelectedCustomer(null)} className="text-gray-500 hover:text-gray-800 p-1 rounded-full hover:bg-gray-100">
                                <XMarkIcon />
                             </button>
                        </div>
                        <div className="overflow-y-auto">
                            {customerOrders.length > 0 ? (
                                <table className="w-full text-sm text-left">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                        <tr>
                                            <th className="px-4 py-2">Order ID</th>
                                            <th className="px-4 py-2">Date</th>
                                            <th className="px-4 py-2">Total</th>
                                            <th className="px-4 py-2">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {customerOrders.map((order: Order) => (
                                        <tr key={order.id} className="border-b">
                                            <td className="px-4 py-2 font-medium">#{order.id}</td>
                                            <td className="px-4 py-2">{new Date(order.orderDate).toLocaleDateString()}</td>
                                            <td className="px-4 py-2">RM{order.totalPrice.toFixed(2)}</td>
                                            <td className="px-4 py-2">{order.status}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p>This customer has no orders.</p>
                            )}
                        </div>
                         <button onClick={() => setSelectedCustomer(null)} className="mt-4 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 self-end">
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageCustomersPage;
