// src/pages/GledamCash.jsx

import React from 'react';
// 1. Import Footer because it is not in App.jsx
import Footer from '../components/footer/Footer'; 

const GledamCash = () => {
    return (
        // 2. Use a fragment <> to wrap both the main content and the footer
        <>
            <main className="w-full bg-white text-black min-h-screen">
                
                {/* 1. Header Section - Mimics a navigation bar */}
                <div className="bg-white border-b border-gray-200 py-4 shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-extrabold text-red-600">Gledam Cash Rewards</h1>
                        <p className="text-gray-500 mt-1">Loyalty Program for the Beast in you!</p>
                    </div>
                </div>

                {/* 2. Main Content and Referral Cards */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

                    {/* Top Banner (Similar to the image's Sign Up area) */}
                    <div className="bg-lime-500 p-6 sm:p-10 rounded-xl shadow-lg text-center mb-12">
                        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-2">
                            Become a Gledam Insider!
                        </h2>
                        <p className="text-white text-lg mb-6">
                            Start earning Gledam Cash on every purchase and unlock exclusive deals.
                        </p>
                        <button className="bg-white text-lime-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg transition duration-300 shadow-md">
                            Sign Up Now
                        </button>
                    </div>

                    {/* Refer & Earn Section */}
                    <div className="text-center mb-10">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-2">Refer & Earn</h2>
                        <p className="text-gray-600 mb-8">Refer, Reward, Repeat!</p>

                        <div className="flex justify-center gap-6 sm:gap-12 mb-10">
                            {/* Referrer Earnings */}
                            <div className="p-4 sm:p-6 border border-gray-200 rounded-xl text-center shadow-sm">
                                <p className="text-lg text-gray-700">You get</p>
                                <p className="text-5xl font-extrabold text-red-600 mt-1">₹50</p>
                            </div>
                            {/* Referee Earnings */}
                            <div className="p-4 sm:p-6 border border-gray-200 rounded-xl text-center shadow-sm">
                                <p className="text-lg text-gray-700">They get</p>
                                <p className="text-5xl font-extrabold text-red-600 mt-1">₹50</p>
                            </div>
                        </div>

                        <button className="bg-red-600 text-white hover:bg-red-700 font-bold py-3 px-12 rounded-lg transition duration-300 text-lg shadow-xl">
                            REFER YOUR FRIEND
                        </button>
                    </div>

                    {/* FAQs Section */}
                    <div className="mt-16 border-t pt-10">
                        <h3 className="text-3xl font-bold text-center mb-8">GLEDAM CASH FAQs</h3>
                        
                        <div className="space-y-4">
                            {/* FAQ Item 1 */}
                            <div className="border border-gray-200 rounded-lg p-4">
                                <details className="cursor-pointer">
                                    <summary className="font-semibold text-lg text-gray-800">What is Gledam Cash?</summary>
                                    <p className="mt-2 text-gray-600 pl-4">
                                        Gledam Cash is our loyalty currency. Every 1 Gledam Cash equals ₹1. You earn it on every purchase and can use it to get discounts on future orders.
                                    </p>
                                </details>
                            </div>

                            {/* FAQ Item 2 */}
                            <div className="border border-gray-200 rounded-lg p-4">
                                <details className="cursor-pointer">
                                    <summary className="font-semibold text-lg text-gray-800">How do I earn Gledam Cash?</summary>
                                    <p className="mt-2 text-gray-600 pl-4">
                                        You earn Gledam Cash by signing up, celebrating your birthday, and making successful purchases. The earning rate varies by tier.
                                    </p>
                                </details>
                            </div>
                            
                            {/* FAQ Item 3 */}
                            <div className="border border-gray-200 rounded-lg p-4">
                                <details className="cursor-pointer">
                                    <summary className="font-semibold text-lg text-gray-800">Can I use Gledam Cash on all products?</summary>
                                    <p className="mt-2 text-gray-600 pl-4">
                                        Gledam Cash can be redeemed on most products, but some exclusions may apply, particularly during special sales or bundled offers. Check the product page for details.
                                    </p>
                                </details>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            
            {/* 3. Footer added here since it's not in App.jsx */}
            <Footer />
        </>
    );
};

export default GledamCash;