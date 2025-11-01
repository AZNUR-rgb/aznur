
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { XMarkIcon, TrashIcon } from './Icons';

interface CartSidebarProps {
  isOpen: boolean;
  toggle: () => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, toggle }) => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    toggle();
    navigate('/checkout');
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={toggle}
      ></div>
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-surface shadow-xl z-50 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-xl font-semibold">Your Cart</h2>
            <button onClick={toggle} className="p-2 rounded-full hover:bg-gray-100">
              <XMarkIcon />
            </button>
          </div>

          {cartItems.length === 0 ? (
            <div className="flex-grow flex items-center justify-center">
              <p className="text-gray-500">Your cart is empty.</p>
            </div>
          ) : (
            <div className="flex-grow overflow-y-auto p-4">
              {cartItems.map(item => (
                <div key={item.id} className="flex items-center mb-4">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
                  <div className="ml-4 flex-grow">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-500">RM{item.price.toFixed(2)}</p>
                    <div className="flex items-center mt-2">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2 py-1 border rounded">-</button>
                      <span className="px-3">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2 py-1 border rounded">+</button>
                    </div>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="ml-4 p-2 text-gray-500 hover:text-red-500">
                    <TrashIcon />
                  </button>
                </div>
              ))}
            </div>
          )}

          {cartItems.length > 0 && (
            <div className="p-4 border-t">
              <div className="flex justify-between font-bold text-lg mb-4">
                <span>Subtotal:</span>
                <span>RM{cartTotal.toFixed(2)}</span>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full bg-primary text-white py-3 rounded-md font-semibold hover:bg-fuchsia-700 transition-colors"
              >
                Proceed to Checkout
              </button>
              <button
                onClick={clearCart}
                className="w-full mt-2 text-sm text-gray-500 hover:text-red-600"
              >
                Clear Cart
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartSidebar;
