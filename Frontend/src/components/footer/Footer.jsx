import React from 'react';
import { FaFacebookF, FaInstagram, FaWhatsapp, FaYoutube } from 'react-icons/fa';
import GledamLogo from '../common/GledamLogo';

const Footer = () => {
  return (
  <footer className="gledam-footer relative bg-black text-white w-full overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 pt-12 pb-6 lg:pt-16 lg:pb-8">
        {/* Header: Brand like navbar */}
        <div className="mb-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-wide uppercase flex items-baseline gap-1">
            <span className="text-red-500">G</span>ledam
            <span className="h-2 w-2 bg-red-500 rounded-full inline-block" />
          </h2>
          <p className="mt-2 text-xs sm:text-sm tracking-widest uppercase text-gray-300">Fuel Your Beast</p>
        </div>

        {/* Description */}
        <p className=" text-gray-200 leading-relaxed text-md mb-10">
          Your one-stop solution for all your supplement needs! Game-changing products that are geared to unlock your #BeastMode and drive top-tier performance for all your hustle days. Explore our epic lineup of fuel that's genius-built, expert-tested and beast-approved!
          <br/>
          Go Hustle!
        </p>
    {/* Link sections */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 lg:gap-12">
          {/* For Customer */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">For Customer</h3>
            <ul className="space-y-1 sm:space-y-2 text-gray-300 text-sm sm:text-base">
              <li><a href="#" className="!text-white visited:!text-white hover:!text-white focus:!text-white active:!text-white focus-visible:!text-white no-underline">About Us</a></li>
              <li><a href="#" className="!text-white visited:!text-white hover:!text-white focus:!text-white active:!text-white focus-visible:!text-white no-underline">Gledam Cash</a></li>
              <li><a href="#" className="!text-white visited:!text-white hover:!text-white focus:!text-white active:!text-white focus-visible:!text-white no-underline">Refer and Earn</a></li>
              <li><a href="#" className="!text-white visited:!text-white hover:!text-white focus:!text-white active:!text-white focus-visible:!text-white no-underline">privacy policy</a></li>
              <li><a href="#" className="!text-white visited:!text-white hover:!text-white focus:!text-white active:!text-white focus-visible:!text-white no-underline">Terms and Conditions</a></li>
            </ul>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Product</h3>
            <ul className="space-y-1 sm:space-y-2 text-gray-300 text-sm sm:text-base">
              <li><a href="#" className="!text-white visited:!text-white hover:!text-white focus:!text-white active:!text-white focus-visible:!text-white no-underline">Protein</a></li>
              <li><a href="#" className="!text-white visited:!text-white hover:!text-white focus:!text-white active:!text-white focus-visible:!text-white no-underline">Gainer</a></li>
              <li><a href="#" className="!text-white visited:!text-white hover:!text-white focus:!text-white active:!text-white focus-visible:!text-white no-underline">Creatine</a></li>
              <li><a href="#" className="!text-white visited:!text-white hover:!text-white focus:!text-white active:!text-white focus-visible:!text-white no-underline">Peanut butter</a></li>
              <li><a href="#" className="!text-white visited:!text-white hover:!text-white focus:!text-white active:!text-white focus-visible:!text-white no-underline">Multivitamins</a></li>
            </ul>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Explore</h3>
            <ul className="space-y-1 sm:space-y-2 text-gray-300 text-sm sm:text-base">
              <li><a href="#" className="!text-white visited:!text-white hover:!text-white focus:!text-white active:!text-white focus-visible:!text-white no-underline">Blogs</a></li>
              <li><a href="#" className="!text-white visited:!text-white hover:!text-white focus:!text-white active:!text-white focus-visible:!text-white no-underline">LabReports</a></li>
              <li><a href="#" className="!text-white visited:!text-white hover:!text-white focus:!text-white active:!text-white focus-visible:!text-white no-underline">Track Order</a></li>
            </ul>
          </div>

          {/* Connect us */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Connect us</h3>
            <div className="flex items-center gap-4">
              <a href="#" aria-label="Facebook" className="p-2 rounded-full bg-white/10 hover:bg-white/20 !text-white">
                <FaFacebookF className="h-5 w-5" />
              </a>
              <a href="#" aria-label="Instagram" className="p-2 rounded-full bg-white/10 hover:bg-white/20 !text-white">
                <FaInstagram className="h-5 w-5" />
              </a>
              <a href="#" aria-label="WhatsApp" className="p-2 rounded-full bg-white/10 hover:bg-white/20 !text-white">
                <FaWhatsapp className="h-5 w-5" />
              </a>
              <a href="#" aria-label="YouTube" className="p-2 rounded-full bg-white/10 hover:bg-white/20 !text-white">
                <FaYoutube className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Emblem-only logo at bottom-right above copyright */}
        

        {/* Divider */}
        <div className="border-t border-white/10 mt-12 pt-6 text-center text-gray-400 text-sm">
          copyright @2025 Gledam. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
