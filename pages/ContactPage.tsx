
import React from 'react';

const ContactPage: React.FC = () => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        (e.target as HTMLFormElement).reset();
    };

    return (
        <div className="py-16 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold text-gray-900">Get In Touch</h1>
                    <p className="mt-4 text-lg text-gray-600">We'd love to hear from you. Send us a message or visit us!</p>
                </div>

                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                                <input type="text" id="name" name="name" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                <input type="email" id="email" name="email" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                                <textarea id="message" name="message" rows={4} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"></textarea>
                            </div>
                            <div>
                                <button type="submit" className="w-full bg-primary text-white py-3 px-4 rounded-md font-semibold hover:bg-fuchsia-700 transition-colors">
                                    Send Message
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Contact Info & Map */}
                    <div className="space-y-8">
                         <div className="bg-white p-8 rounded-lg shadow-lg">
                             <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
                             <div className="space-y-4 text-gray-600">
                                <p><strong>Address:</strong> 123, Jalan Sedap, 50480 Kuala Lumpur, Malaysia</p>
                                <p><strong>Phone:</strong> (60) 12-345 6789</p>
                                <p><strong>Email:</strong> contact@wanizar.com.my</p>
                             </div>
                         </div>
                        <div className="rounded-lg shadow-lg overflow-hidden">
                             <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3983.788599411931!2d101.69611131534066!3d3.149179997705501!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cc49c40843c08b%3A0x89c09b5a2663063!2sPetronas%20Twin%20Towers!5e0!3m2!1sen!2sus!4v1626284249451!5m2!1sen!2sus"
                                width="100%"
                                height="300"
                                style={{ border: 0 }}
                                allowFullScreen={true}
                                loading="lazy"
                                title="Restaurant Location"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
