import React from 'react';
// Assuming your Footer component is located at this path
import Footer from '../components/footer/Footer'; 

const TermsConditions = () => {
  return (
    // Wrap the entire page content and footer in a fragment or wrapper element
    <>
      <main className="w-full bg-white text-black min-h-screen overflow-hidden">
        <div className="max-w-4xl mx-auto p-8 my-10 bg-white shadow-lg">
          <h1 className="text-3xl font-bold mb-6 text-center">Terms and Conditions</h1>

          <p className="mb-4">
            **Last Updated: October 9, 2025**
          </p>

          <p className="mb-6">
            Welcome to **GLEDAM**! These terms and conditions outline the rules and regulations for the use of GLEDAM's website and services. By accessing this website, we assume you accept these terms and conditions. Do not continue to use GLEDAM if you do not agree to all of the terms and conditions stated on this page.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-4">1. User Accounts</h2>
          <p className="mb-4">
            If you create an account, you are responsible for maintaining the security of your account and you are fully responsible for all activities that occur under the account.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-4">2. Intellectual Property</h2>
          <p className="mb-4">
            All content on this site, including text, graphics, logos, and images, is the property of GLEDAM or its content suppliers and protected by international copyright laws.
          </p>

          <p className="italic mt-8 text-sm text-gray-600">
            This is a preliminary document. A final version of the Terms and Conditions will be posted once legally reviewed.
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default TermsConditions;