
import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useCart } from '../context/CartContext';
import { MenuItem } from '../types';

const MenuItemCard: React.FC<{ item: MenuItem; onAddToCart: (item: MenuItem) => void }> = ({ item, onAddToCart }) => {
    return (
        <div className="bg-surface rounded-lg shadow-lg overflow-hidden flex flex-col">
            <img className="w-full h-48 object-cover" src={item.image} alt={item.name} />
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                <p className="text-gray-600 mb-4 flex-grow">{item.description}</p>
                <div className="flex justify-between items-center mt-auto">
                    <span className="text-lg font-semibold text-primary">RM{item.price.toFixed(2)}</span>
                    <button
                        onClick={() => onAddToCart(item)}
                        className="bg-secondary text-gray-800 font-semibold py-2 px-4 rounded-md hover:bg-yellow-500 transition-colors"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

const MenuPage: React.FC = () => {
    const { menuItems, isLoading } = useData();
    const { addToCart } = useCart();
    const [activeTab, setActiveTab] = useState<'food' | 'drink'>('food');

    const filteredItems = menuItems.filter(item => item.category === activeTab);

    if (isLoading) {
        return <div className="text-center py-20">Loading menu...</div>;
    }

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-4xl font-extrabold text-center mb-10">Our Menu</h1>
            
            <div className="flex justify-center mb-8 border-b">
                <button
                    onClick={() => setActiveTab('food')}
                    className={`px-6 py-3 text-lg font-semibold border-b-4 transition-colors ${
                        activeTab === 'food' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-primary'
                    }`}
                >
                    Food
                </button>
                <button
                    onClick={() => setActiveTab('drink')}
                    className={`px-6 py-3 text-lg font-semibold border-b-4 transition-colors ${
                        activeTab === 'drink' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-primary'
                    }`}
                >
                    Drinks
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredItems.map(item => (
                    <MenuItemCard key={item.id} item={item} onAddToCart={addToCart} />
                ))}
            </div>
        </div>
    );
};

export default MenuPage;
