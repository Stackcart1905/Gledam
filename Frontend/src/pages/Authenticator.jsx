import React, { useState } from 'react';
import Footer from '@/components/footer/Footer';

const neon = '#CCFF00';

const Authenticator = () => {
  const [code, setCode] = useState('');
  const [phone, setPhone] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    // Placeholder: wire real API later
    alert(`Checking authenticity for code ${code} and phone ${phone}`);
  };

  return (
    <main className="w-full bg-black text-white">
      {/* Container below navbar */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left: Heading + form */}
          <div>
            <h1 className="text-[56px] leading-[1.05] font-extrabold tracking-tight mb-4" style={{ color: neon }}>
              Product Authentication
            </h1>
            <p className="text-xl text-gray-200 mb-10">
              Please enter the 6 digit unique code from the BeastLife verification sticker.
            </p>

            <form onSubmit={onSubmit} className="space-y-6 max-w-xl">
              <div>
                <label className="block text-sm text-gray-300 mb-2">Enter your 6 digit code here*</label>
                <input
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="a0 b0 c0"
                  className="w-full rounded-lg px-4 py-3 text-black bg-white"
                  maxLength={20}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-2">Enter your Phone Number</label>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder=""
                  className="w-full rounded-lg px-4 py-3 text-black bg-white"
                  maxLength={20}
                />
              </div>
              <button
                type="submit"
                className="w-full font-semibold rounded-lg py-3"
                style={{ backgroundColor: neon, color: '#000' }}
              >
                Check Authenticity
              </button>
            </form>
          </div>

          {/* Right: 'Gledam' brand in navbar style instead of human image */}
          <div className="flex justify-center lg:justify-end">
            <div className="text-right">
              <h2 className="text-7xl font-extrabold uppercase tracking-wider">
                <span className="text-red-500">G</span>
                <span>ledam</span>
                <span className="h-3 w-3 bg-red-500 rounded-full inline-block ml-2 align-top" />
              </h2>
              <p className="text-sm tracking-[0.3em] uppercase text-gray-300 mt-2">Fuel Your Beast</p>
            </div>
          </div>
        </div>
      </div>

      {/* White background section below authenticator content */}
      <section className="w-full bg-white mt-12">
        <div className="max-w-7xl mx-auto px-6 py-6">
          {/* Divider line (light on white bg) */}
          <hr className="mt-8 border-t border-black w-full" />

          {/* Back to top button (match home-style: centered, rounded, dark) */}
          <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-2 font-semibold text-black hover:underline"
            aria-label="Back to top"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 19V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M6 11l6-6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to Top
          </button>
        </div>
        </div>
      </section>

      {/* Footer like home */}
      <Footer />
    </main>
  );
};

export default Authenticator;
