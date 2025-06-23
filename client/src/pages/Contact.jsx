import React from 'react';

const Contact = () => {
    return (
        <div className="flex flex-col items-center px-4 md:px-12 lg:px-32 py-16 bg-gradient-to-br from-blue-50 to-slate-100 min-h-screen">
            <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-3 text-center text-blue-900 drop-shadow">Contact Us</h1>
            <p className="text-gray-600 text-center max-w-2xl mb-12 text-lg">We're here to help! Find all the ways you can reach us, our operating hours, and answers to common questions below.</p>
            <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Contact Info & Socials */}
                <div className="flex flex-col gap-8 bg-white/90 rounded-2xl shadow-xl p-8 border border-blue-100 hover:shadow-2xl transition-shadow duration-300">
                    <div>
                        <h2 className="text-2xl font-semibold mb-3 text-blue-800">Contact Information</h2>
                        <ul className="space-y-2 text-gray-700">
                            <li><span className="font-medium text-blue-700">Email:</span> support@quickstay.com</li>
                            <li><span className="font-medium text-blue-700">Phone:</span> <a href="tel:+18001234567" className="hover:text-blue-500 transition">+1 (800) 123-4567</a></li>
                            <li><span className="font-medium text-blue-700">WhatsApp:</span> <a href="https://wa.me/18009876543" target="_blank" rel="noopener noreferrer" className="hover:text-green-600 transition">+1 (800) 987-6543</a></li>
                            <li><span className="font-medium text-blue-700">Address:</span> 123 Main Street, Jamnagar, India</li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="text-2xl font-semibold mb-3 text-blue-800">Operating Hours</h2>
                        <ul className="space-y-1">
                            <li><span className="font-medium text-blue-700">Customer Support:</span> 24/7</li>
                            <li><span className="font-medium text-blue-700">Office:</span> Mon–Fri, 9:00 AM – 6:00 PM</li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="text-2xl font-semibold mb-3 text-blue-800">Response Time</h2>
                        <p className="text-gray-700">We aim to respond to all inquiries within <span className="font-semibold text-blue-700">24 hours</span>.</p>
                    </div>
                    <div>
                        <h2 className="text-2xl font-semibold mb-3 text-blue-800">Follow Us</h2>
                        <div className="flex gap-4 mt-1">
                            <a href="#" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform"><img src="/src/assets/instagramIcon.svg" alt="Instagram" className="w-7" /></a>
                            <a href="#" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform"><img src="/src/assets/facebookIcon.svg" alt="Facebook" className="w-7" /></a>
                            <a href="#" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform"><img src="/src/assets/twitterIcon.svg" alt="Twitter" className="w-7" /></a>
                            <a href="#" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform"><img src="/src/assets/linkendinIcon.svg" alt="LinkedIn" className="w-7" /></a>
                        </div>
                    </div>
                </div>
                {/* Map, FAQ, Accessibility */}
                <div className="flex flex-col gap-8 bg-white/90 rounded-2xl shadow-xl p-8 border border-blue-100 hover:shadow-2xl transition-shadow duration-300">
                    <div>
                        <h2 className="text-2xl font-semibold mb-3 text-blue-800">Our Location</h2>
                        <div className="rounded-lg overflow-hidden shadow border border-blue-200 hover:scale-[1.02] transition-transform duration-300">
                            <iframe
                                title="QuickStay Jamnagar Location"
                                src="https://www.google.com/maps?q=Jamnagar,India&output=embed"
                                width="100%"
                                height="200"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-2xl font-semibold mb-3 text-blue-800">Frequently Asked Questions</h2>
                        <ul className="list-disc list-inside text-gray-700 mb-2 space-y-1">
                            <li className="hover:text-blue-600 transition">How do I change my booking?</li>
                            <li className="hover:text-blue-600 transition">What is your cancellation policy?</li>
                            <li className="hover:text-blue-600 transition">How do I contact support?</li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="text-2xl font-semibold mb-3 text-blue-800">Accessibility</h2>
                        <p className="text-gray-600">We are committed to making our website accessible to everyone. If you have difficulty using our site, please contact us for assistance.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact; 