// src/pages/ReferAndEarn.jsx

import React from 'react';
import Footer from '../components/footer/Footer'; // Import Footer

// Icon placeholders (assuming you use react-icons or similar)
// If you use react-icons, you'd import: 
// import { FaRegLightbulb, FaTruck, FaWallet } from 'react-icons/fa';

const ReferAndEarn = () => {
    
    // Data structure for the steps section
    const steps = [
        {
            icon: '✨', // Replace with an actual icon component like FaRegLightbulb
            title: 'Invite Your Friend',
            description: 'Share your unique referral link to invite friends to Gledam.',
        },
        {
            icon: '📦', // Replace with an actual icon component like FaTruck
            title: 'Friend Places an Order',
            description: 'Your friend must complete their first successful purchase using your link.',
        },
        {
            icon: '💰', // Replace with an actual icon component like FaWallet
            title: 'You Get Rewarded',
            description: 'You and your friend will both receive ₹100 Gledam Cash once the order is confirmed.',
        },
    ];

    const StepCard = ({ icon, title, description }) => (
        <div className="flex flex-col items-center text-center px-4 sm:px-6 py-6 border-2 border-transparent hover:border-red-500 rounded-xl transition duration-300 transform hover:scale-[1.02]">
            <div className="text-4xl sm:text-5xl text-red-500 mb-4">{icon}</div>
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
    );

    return (
        <>
            <main className="w-full bg-white text-black min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    
                    {/* Main Title Section */}
                    <div className="text-center mb-16">
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-2">Refer a Friend</h1>
                        <p className="text-xl text-gray-600">Follow the steps below to get rewarded</p>
                    </div>

                    {/* How It Works - Steps Section */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 lg:gap-12 relative items-start">
                        {steps.map((step, index) => (
                            <React.Fragment key={index}>
                                <StepCard {...step} />
                                {/* Display arrow/separator only between steps */}
                                {index < steps.length - 1 && (
                                    <div className="hidden md:flex items-center justify-center absolute top-1/2 -translate-y-1/2 left-1/3 w-1/3">
                                        <svg className="w-full h-4 text-red-500" viewBox="0 0 100 10" preserveAspectRatio="none">
                                            <path d="M 0 5 L 90 5" stroke="currentColor" strokeWidth="1" fill="none" />
                                            <polygon points="90,0 100,5 90,10" fill="currentColor" />
                                        </svg>
                                    </div>
                                )}
                            </React.Fragment>
                        ))}
                    </div>

                    {/* Referral Button */}
                    <div className="text-center mt-12 sm:mt-16">
                        <button className="bg-red-500 text-white hover:bg-red-600 font-bold py-3 px-16 rounded-lg transition duration-300 text-lg shadow-xl uppercase tracking-wider">
                            REFER YOUR FRIEND
                        </button>
                        <p className="mt-4 text-sm text-gray-500">Your unique code: GLEDAMBEAST10</p>
                    </div>

                    {/* Secondary Section (How to Earn) - Mimics second part of the image */}
                    <div className="mt-20 border-t pt-10">
                        <h2 className="text-3xl font-bold text-center mb-8">Here's how you can earn more Gledam Cash</h2>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            
                            {/* Card 1: Sign Up */}
                            <div className="bg-gray-50 p-6 rounded-xl shadow-md border-t-4 border-red-500">
                                <div className="text-3xl mb-3">✅</div>
                                <h3 className="text-xl font-semibold mb-2">Sign Up Bonus</h3>
                                <p className="text-gray-600">Get 50 Gledam Cash instantly just for creating an account and joining the Beast tribe!</p>
                            </div>

                            {/* Card 2: Share Birthday */}
                            <div className="bg-gray-50 p-6 rounded-xl shadow-md border-t-4 border-red-500">
                                <div className="text-3xl mb-3">🎂</div>
                                <h3 className="text-xl font-semibold mb-2">Birthday Gift</h3>
                                <p className="text-gray-600">Share your birthday with us and receive a special gift of 50 Gledam Cash every year.</p>
                            </div>

                            {/* Card 3: Place Order */}
                            <div className="bg-gray-50 p-6 rounded-xl shadow-md border-t-4 border-red-500">
                                <div className="text-3xl mb-3">🛒</div>
                                <h3 className="text-xl font-semibold mb-2">Order Placed</h3>
                                <p className="text-gray-600">Get up to 5% of your order value back in Gledam Cash on every single purchase.</p>
                            </div>

                        </div>
                    </div>
                </div>
            </main>
            
            <Footer />
        </>
    );
};

export default ReferAndEarn;