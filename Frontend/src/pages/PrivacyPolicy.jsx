import React from 'react';
// Assuming your Footer component is located at this path
import Footer from '../components/footer/Footer'; 

const PrivacyPolicy = () => {
  return (
    // Wrap the entire page content and footer in a fragment or wrapper element
    <>
      <main className="w-full bg-white text-black min-h-screen overflow-hidden">
        <div className="max-w-4xl mx-auto p-8 my-10 bg-white shadow-lg">
          <h1 className="text-3xl font-bold mb-6 text-center">Privacy Policy</h1>

          <p className="mb-4">
            **Effective Date: October 9, 2025**
          </p>

          <p className="mb-6">
            This is the placeholder Privacy Policy for **GLEDAM**. We respect your privacy and are committed to protecting your personal data. This policy will explain how we collect, use, and protect your information.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-4">1. Information We Collect</h2>
          <p className="mb-4">
            We collect information you provide directly to us, such as your name, email address, shipping address, and payment information when you make a purchase.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-4">2. How We Use Your Information</h2>
          <ul className="list-disc ml-8 mb-6">
            <li>To process and fulfill your orders.</li>
            <li>To communicate with you about products, services, and promotions.</li>
            <li>To improve our website and customer service.</li>
            <li>To comply with legal obligations.</li>
          </ul>

          <p className="italic mt-8 text-sm text-gray-600">
            A comprehensive, legally reviewed privacy policy will be added soon. For now, know that your data is handled with care and never sold to third parties.
          </p>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default PrivacyPolicy;