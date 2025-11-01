
import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-800 text-white mt-auto">
            <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Restaurant Wanizar</h3>
                        <p className="text-gray-400">Delicious meals, delivered to your door. Experience the taste of authentic Malaysian cuisine.</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
                        <ul className="text-gray-400 space-y-2">
                            <li><a href="#/" className="hover:text-secondary">Home</a></li>
                            <li><a href="#/menu" className="hover:text-secondary">Menu</a></li>
                            <li><a href="#/about" className="hover:text-secondary">About Us</a></li>
                            <li><a href="#/contact" className="hover:text-secondary">Contact</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
                        <ul className="text-gray-400 space-y-2">
                            <li>123, Jalan Sedap, 50480 Kuala Lumpur</li>
                            <li>Phone: (60) 12-345 6789</li>
                            <li>Email: contact@wanizar.com.my</li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-500 text-sm">
                    <p>&copy; {new Date().getFullYear()} Restaurant Wanizar. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
