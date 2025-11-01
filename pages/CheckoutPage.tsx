
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { OrderItem, OrderStatus } from '../types';

const CheckoutPage: React.FC = () => {
    const { cartItems, cartTotal, clearCart } = useCart();
    const { submitOrder } = useData();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: user?.username || '',
        phone: '',
        address: '',
        paymentMethod: 'Cash on Delivery' as 'Cash on Delivery' | 'Online Banking',
    });
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (cartItems.length === 0) {
            setError('Your cart is empty.');
            return;
        }
        setIsProcessing(true);
        setError('');

        const orderItems: OrderItem[] = cartItems.map(item => ({
            id: Date.now() + item.id,
            menuItem: item,
            quantity: item.quantity,
            subtotal: item.price * item.quantity,
        }));

        const newOrderData = {
            customerName: formData.name,
            customerPhone: formData.phone,
            customerAddress: formData.address,
            items: orderItems,
            totalPrice: cartTotal,
            status: OrderStatus.Pending,
            paymentMethod: formData.paymentMethod,
        };
        
        const newOrder = await submitOrder(newOrderData);

        if (newOrder) {
            clearCart();
            alert(`Order placed successfully! Your order ID is #${newOrder.id}.`);
            navigate('/order-history');
        } else {
            setError('There was an error placing your order. Please try again.');
        }

        setIsProcessing(false);
    };

    if (cartItems.length === 0) {
        return (
            <div className="container mx-auto text-center py-20">
                <h1 className="text-2xl font-bold">Your cart is empty.</h1>
                <button onClick={() => navigate('/menu')} className="mt-4 bg-primary text-white py-2 px-6 rounded-md">
                    Go to Menu
                </button>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-extrabold text-center mb-10">Checkout</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 bg-white p-8 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold mb-6">Delivery Details</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" />
                        </div>
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                            <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" />
                        </div>
                        <div>
                            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Delivery Address</label>
                            <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" />
                        </div>
                         <div>
                            <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700">Payment Method</label>
                            <select id="paymentMethod" name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary">
                                <option>Cash on Delivery</option>
                                <option>Online Banking</option>
                            </select>
                        </div>
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        <button type="submit" disabled={isProcessing} className="w-full bg-primary text-white py-3 px-4 rounded-md font-semibold hover:bg-fuchsia-700 transition-colors disabled:bg-gray-400">
                            {isProcessing ? 'Placing Order...' : `Place Order (RM${cartTotal.toFixed(2)})`}
                        </button>
                    </form>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-lg h-fit">
                    <h2 className="text-2xl font-bold mb-6">Your Order Summary</h2>
                    <div className="space-y-4">
                        {cartItems.map(item => (
                            <div key={item.id} className="flex justify-between items-center text-sm">
                                <div>
                                    <p className="font-semibold">{item.name}</p>
                                    <p className="text-gray-500">Qty: {item.quantity}</p>
                                </div>
                                <p>RM{(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                        ))}
                    </div>
                    <hr className="my-4"/>
                    <div className="flex justify-between font-bold text-lg">
                        <p>Total</p>
                        <p>RM{cartTotal.toFixed(2)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
