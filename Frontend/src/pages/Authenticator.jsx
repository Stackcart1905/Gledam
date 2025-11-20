import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '@/components/footer/Footer';

const neon = '#CCFF00';

const Authenticator = () => {
  const navigate = useNavigate();
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
      <div className="max-w-7xl mx-auto px-6 py-16">
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
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <button 
                onClick={() => navigate('/login')}
                className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                User Login
              </button>
              <button 
                onClick={() => navigate('/signup')}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 transition-colors"
              >
                Sign Up
              </button>
              <button 
                onClick={() => navigate('/admin-login')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
              >
                Admin Login
              </button>
            </div>
          </div>

          {/* Right: 'Gledam' brand in navbar style instead of human image */}
          <div className="flex justify-center lg:justify-end mr-0 lg:mr-26">
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
     
    </main>
  );
};

export default Authenticator;
