import React from 'react';

const About = () => {
    return (
        <div className="flex flex-col items-center px-4 md:px-12 lg:px-32 py-16 bg-gradient-to-br from-blue-50 to-slate-100 min-h-screen">
            <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-3 text-center text-blue-900 drop-shadow">About QuickStay</h1>
            <p className="text-gray-700 text-center max-w-2xl mb-10 text-lg">QuickStay is your trusted partner for discovering and booking the world's best hotels. We combine technology, expertise, and a passion for travel to make your stay seamless and memorable.</p>
            {/* Mission & Vision */}
            <div className="w-full max-w-4xl bg-white/90 rounded-2xl shadow-xl p-8 border border-blue-100 mb-10">
                <h2 className="text-2xl font-semibold mb-2 text-blue-800">Our Mission</h2>
                <p className="text-gray-700 mb-4">To empower travelers with a simple, secure, and enjoyable hotel booking experience, offering a curated selection of properties for every taste and budget.</p>
                <h2 className="text-2xl font-semibold mb-2 text-blue-800">Our Vision</h2>
                <p className="text-gray-700">To be the world's most trusted and innovative hotel booking platform, making travel accessible and delightful for everyone.</p>
            </div>
            {/* How It Works */}
            <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                {[
                    { step: '1', title: 'Search', desc: 'Find your perfect destination and dates.' },
                    { step: '2', title: 'Compare', desc: 'Browse hotels, rooms, and guest reviews.' },
                    { step: '3', title: 'Book', desc: 'Reserve securely in just a few clicks.' },
                    { step: '4', title: 'Enjoy', desc: 'Check in and experience your stay!' },
                ].map((item) => (
                    <div key={item.step} className="flex flex-col items-center bg-white/90 rounded-xl shadow p-6 border border-blue-50 hover:shadow-lg transition">
                        <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mb-2 shadow">{item.step}</div>
                        <h3 className="font-semibold text-blue-800 mb-1">{item.title}</h3>
                        <p className="text-gray-600 text-center text-sm">{item.desc}</p>
                    </div>
                ))}
            </div>
            {/* Why Choose Us */}
            <div className="w-full max-w-4xl bg-white/90 rounded-2xl shadow-xl p-8 border border-blue-100 mb-10">
                <h2 className="text-2xl font-semibold mb-4 text-blue-800 text-center">Why Choose QuickStay?</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 text-base">
                    <li className="flex items-center gap-2"><span className="text-blue-600 text-xl">★</span> Handpicked hotels and exclusive offers</li>
                    <li className="flex items-center gap-2"><span className="text-blue-600 text-xl">🔒</span> Easy and secure online booking</li>
                    <li className="flex items-center gap-2"><span className="text-blue-600 text-xl">🕑</span> 24/7 customer support</li>
                    <li className="flex items-center gap-2"><span className="text-blue-600 text-xl">💬</span> Real guest reviews</li>
                    <li className="flex items-center gap-2"><span className="text-blue-600 text-xl">💰</span> Transparent pricing, no hidden fees</li>
                </ul>
            </div>
            {/* Core Values */}
            <div className="w-full max-w-4xl bg-white/90 rounded-2xl shadow-xl p-8 border border-blue-100 mb-10">
                <h2 className="text-2xl font-semibold mb-4 text-blue-800 text-center">Our Values</h2>
                <ul className="flex flex-wrap justify-center gap-6 text-gray-700 text-base">
                    <li className="bg-blue-50 rounded px-4 py-2 shadow-sm">Customer First</li>
                    <li className="bg-blue-50 rounded px-4 py-2 shadow-sm">Integrity & Transparency</li>
                    <li className="bg-blue-50 rounded px-4 py-2 shadow-sm">Innovation</li>
                    <li className="bg-blue-50 rounded px-4 py-2 shadow-sm">Quality</li>
                    <li className="bg-blue-50 rounded px-4 py-2 shadow-sm">Sustainability</li>
                </ul>
            </div>
            {/* Testimonials */}
            <div className="w-full max-w-4xl bg-white/90 rounded-2xl shadow-xl p-8 border border-blue-100 mb-10">
                <h2 className="text-2xl font-semibold mb-4 text-blue-800 text-center">What Our Guests Say</h2>
                <div className="flex flex-col md:flex-row gap-6 justify-center">
                    <div className="flex-1 bg-blue-50 rounded-xl p-6 shadow text-gray-700">
                        <p className="mb-2">"QuickStay made my trip so easy! The booking process was smooth and the hotel was exactly as described."</p>
                        <span className="font-semibold text-blue-700">– Priya S.</span>
                    </div>
                    <div className="flex-1 bg-blue-50 rounded-xl p-6 shadow text-gray-700">
                        <p className="mb-2">"Best hotel deals and amazing support. I'll definitely use QuickStay again!"</p>
                        <span className="font-semibold text-blue-700">– John D.</span>
                    </div>
                </div>
            </div>
            {/* Call to Action */}
            <div className="w-full max-w-2xl text-center mt-8">
                <h2 className="text-2xl font-semibold mb-2 text-blue-800">Ready to book your next stay?</h2>
                <a href="/rooms" className="inline-block mt-2 px-8 py-3 bg-blue-700 text-white rounded-full font-semibold shadow hover:bg-blue-800 transition">Browse Hotels</a>
            </div>
        </div>
    );
};

export default About; 