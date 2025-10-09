import React from 'react';
// Import Link for internal routing
import { Link } from 'react-router-dom'; 
import { FaFacebookF, FaInstagram, FaWhatsapp, FaYoutube } from 'react-icons/fa';
import GledamLogo from '../common/GledamLogo';

const Footer = () => {
  // Define a common link class for cleaner, interactive links
  const linkClass = "text-gray-300 hover:text-red-500 transition-colors duration-200 no-underline";

  return (
    <footer className="gledam-footer relative bg-black text-white w-full overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 pt-12 pb-6 lg:pt-16 lg:pb-8">
        
        {/* Header: Brand like navbar */}
        <div className="mb-8">
          {/* NOTE: If GledamLogo is a component, use it here. If not, the H2 is fine. */}
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
            <ul className="space-y-1 sm:space-y-2 text-sm sm:text-base">
              {/* Using Link and `to` prop */}
              <li><Link to="/about" className={linkClass}>About Us</Link></li>
              <li><Link to="/gledam-cash" className={linkClass}>Gledam Cash</Link></li>
              <li><Link to="/refer-earn" className={linkClass}>Refer and Earn</Link></li>
              {/* Policy Pages - Use consistent naming for the route */}
              <li><Link to="/privacy-policy" className={linkClass}>Privacy Policy</Link></li> 
              <li><Link to="/terms-conditions" className={linkClass}>Terms and Conditions</Link></li>
             
            </ul>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Product</h3>
            <ul className="space-y-1 sm:space-y-2 text-sm sm:text-base">
              {/* Product Category Links */}
              <li><Link to="/products/protein" className={linkClass}>Protein</Link></li>
              <li><Link to="/products/gainer" className={linkClass}>Gainer</Link></li>
              <li><Link to="/products/creatine" className={linkClass}>Creatine</Link></li>
              <li><Link to="/products/peanut-butter" className={linkClass}>Peanut butter</Link></li>
              <li><Link to="/products/multivitamins" className={linkClass}>Multivitamins</Link></li>
            </ul>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Explore</h3>
            <ul className="space-y-1 sm:space-y-2 text-sm sm:text-base">
              {/* Explore Links */}
              <li><Link to="/blogs" className={linkClass}>Blogs</Link></li>
              <li><Link to="/lab-reports" className={linkClass}>LabReports</Link></li>
              <li><Link to="/track-order" className={linkClass}>Track Order</Link></li>
            </ul>
          </div>

          {/* Connect us - Social Media (These are external links, so `<a>` is appropriate) */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Connect us</h3>
            <div className="flex items-center gap-4">
              <a href="https://facebook.com/yourhandle" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="p-2 rounded-full bg-white/10 hover:bg-red-600 transition-colors duration-200 !text-white">
                <FaFacebookF className="h-5 w-5" />
              </a>
              <a href="https://instagram.com/yourhandle" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="p-2 rounded-full bg-white/10 hover:bg-red-600 transition-colors duration-200 !text-white">
                <FaInstagram className="h-5 w-5" />
              </a>
             <a 
  // 💥 CORRECTED: Use the 'https://wa.me/' protocol and remove spaces from the number 
  href="https://wa.me/919999999999" 
  target="_blank" 
  rel="noopener noreferrer" 
  aria-label="WhatsApp" 
  className="p-2 rounded-full bg-white/10 hover:bg-red-600 transition-colors duration-200 !text-white"
>
    <FaWhatsapp className="h-5 w-5" />
</a>
              <a href="https://youtube.com/yourchannel" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="p-2 rounded-full bg-white/10 hover:bg-red-600 transition-colors duration-200 !text-white">
                <FaYoutube className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        
        {/* Divider and Copyright */}
        <div className="border-t border-white/10 mt-12 pt-6 text-center text-gray-400 text-sm">
          copyright @2025 Gledam. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;