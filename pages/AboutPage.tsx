
import React from 'react';

const AboutPage: React.FC = () => {
    return (
        <div className="bg-white py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold text-gray-900">About Restaurant Wanizar</h1>
                    <p className="mt-4 text-lg text-gray-600">Your Home for Authentic Malaysian Flavors</p>
                </div>

                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                        <img src="https://picsum.photos/600/400?image=1074" alt="Restaurant Interior" className="rounded-lg shadow-lg" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Story</h2>
                        <p className="text-gray-600 mb-4">
                            Founded in 2010, Restaurant Wanizar began as a small family-run stall with a passion for sharing traditional Malaysian recipes passed down through generations. Our founder, Puan Wanizar, believed that good food brings people together, and this simple philosophy has been the cornerstone of our growth.
                        </p>
                        <p className="text-gray-600">
                            Today, we've grown into a beloved local eatery, but our commitment to authenticity, quality ingredients, and warm hospitality remains unchanged. Every dish we serve is a piece of our heritage, cooked with love and care.
                        </p>
                    </div>
                </div>

                <div className="mt-16 text-center">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-gray-50 p-8 rounded-lg">
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">Our Vision</h3>
                            <p className="text-gray-600">To be the most recognized and celebrated destination for authentic Malaysian cuisine, both locally and internationally.</p>
                        </div>
                        <div className="bg-gray-50 p-8 rounded-lg">
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">Our Mission</h3>
                            <p className="text-gray-600">To consistently provide our guests with an exceptional dining experience by serving high-quality, flavorful dishes in a clean, welcoming, and friendly environment.</p>
                        </div>
                    </div>
                </div>

                 <div className="mt-16">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Meet Our Team</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                        <div className="p-4">
                            <img src="https://picsum.photos/200/200?image=823" alt="Chef" className="w-32 h-32 rounded-full mx-auto mb-4 shadow-md" />
                            <h4 className="text-xl font-semibold">Chef Ismail</h4>
                            <p className="text-gray-500">Head Chef</p>
                        </div>
                        <div className="p-4">
                            <img src="https://picsum.photos/200/200?image=836" alt="Manager" className="w-32 h-32 rounded-full mx-auto mb-4 shadow-md" />
                            <h4 className="text-xl font-semibold">Puan Siti</h4>
                            <p className="text-gray-500">Restaurant Manager</p>
                        </div>
                        <div className="p-4">
                             <img src="https://picsum.photos/200/200?image=64" alt="Staff" className="w-32 h-32 rounded-full mx-auto mb-4 shadow-md" />
                            <h4 className="text-xl font-semibold">Ahmad</h4>
                            <p className="text-gray-500">Service Crew</p>
                        </div>
                        <div className="p-4">
                            <img src="https://picsum.photos/200/200?image=219" alt="Staff" className="w-32 h-32 rounded-full mx-auto mb-4 shadow-md" />
                            <h4 className="text-xl font-semibold">Mei Ling</h4>
                            <p className="text-gray-500">Service Crew</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
