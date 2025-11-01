
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
    return (
        <div>
            {/* Hero Section */}
            <div className="relative h-[60vh] md:h-[80vh] bg-cover bg-center" style={{ backgroundImage: `url('https://th.bing.com/th/id/OIP.A9HlDf_prJuY7hig_U227QHaE8?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3')` }}>
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="text-center text-white p-4">
                        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">Welcome to Restaurant Wanizar</h1>
                        <p className="text-lg md:text-2xl mb-8 drop-shadow-md">Authentic Malaysian Cuisine, Unforgettable Flavors</p>
                        <Link
                            to="/menu"
                            className="bg-primary text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-fuchsia-700 transition-transform transform hover:scale-105 duration-300 ease-in-out"
                        >
                            Order Now
                        </Link>
                    </div>
                </div>
            </div>

            {/* Featured Items Section */}
            <div className="py-16 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center mb-10">Our Specialties</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Featured Item 1 */}
                        <div className="bg-surface rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
                            <img src="https://picsum.photos/400/300?image=1060" alt="Nasi Lemak" className="w-full h-56 object-cover" />
                            <div className="p-6">
                                <h3 className="text-xl font-semibold mb-2">Nasi Lemak Special</h3>
                                <p className="text-gray-600">Our signature coconut rice served with spicy sambal, fried chicken, and all the classic condiments.</p>
                            </div>
                        </div>
                        {/* Featured Item 2 */}
                        <div className="bg-surface rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
                            <img src="https://picsum.photos/400/300?image=292" alt="Char Kuey Teow" className="w-full h-56 object-cover" />
                            <div className="p-6">
                                <h3 className="text-xl font-semibold mb-2">Penang Char Kuey Teow</h3>
                                <p className="text-gray-600">Wok-fried flat rice noodles with prawns, cockles, and bean sprouts in a savory sauce.</p>
                            </div>
                        </div>
                        {/* Featured Item 3 */}
                        <div className="bg-surface rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
                            <img src="https://picsum.photos/400/300?image=367" alt="Teh Tarik" className="w-full h-56 object-cover" />
                            <div className="p-6">
                                <h3 className="text-xl font-semibold mb-2">Classic Teh Tarik</h3>
                                <p className="text-gray-600">The perfect frothy 'pulled' tea to complement your meal. A true Malaysian favorite.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
