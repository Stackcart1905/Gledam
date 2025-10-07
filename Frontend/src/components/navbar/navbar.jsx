import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaWhatsapp, FaQrcode, FaUser, FaShoppingCart, FaSearch } from 'react-icons/fa';
import LoginDialog from "@/components/common/LoginDialog";
import CartDrawer from "@/components/common/CartDrawer";
import { useCart } from "@/lib/cart/CartContext";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [loginOpen, setLoginOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { items } = useCart();
  const navigate = useNavigate();
  const cartCount = useMemo(() => items.reduce((n, i) => n + (i.qty || 1), 0), [items]);

  const navigationItems = [
    { label: 'Product', path: null },
    { label: 'Our Story', path: '/about' },
    { label: 'Authenticity Guaranteed', path: '/authenticator' },
    { label: 'Blogs', path: null },
    { label: 'Track My Order', path: null }
  ];

  return (
    <nav className="bg-black text-white w-full">
      {/* Main Navbar */}
      <div className="w-full px-4 sm:px-6 lg:px-10 pt-4 pb-4">
        <div className="flex items-center justify-between h-16 w-full">
          {/* Left - Gledam Logo (clickable to go Home) */}
          <div
            className="flex-shrink-0 min-w-[120px] sm:min-w-[150px] cursor-pointer select-none"
            role="button"
            tabIndex={0}
            aria-label="Go to home"
            onClick={() => navigate('/')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                navigate('/');
              }
            }}
          >
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-wide text-white uppercase flex items-baseline gap-1">
              <span className="text-red-500">G</span>ledam
              <span className="h-2 w-2 bg-red-500 rounded-full inline-block" />
            </h1>
            <p className="text-[8px] sm:text-[10px] tracking-widest uppercase text-gray-300">Fuel Your Beast</p>
          </div>

          {/* Center - Search Bar (matched width) */}
          <div className="flex-1 px-2 sm:px-4 lg:px-8">
            <div className="relative w-full max-w-4xl mx-auto">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-8 sm:pl-10 pr-3 py-2 border-0 rounded-lg bg-white text-black text-center placeholder-gray-500 outline-none ring-0 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 appearance-none text-sm sm:text-base"
              />
            </div>
          </div>

          {/* Right - Icons (display only, no focus/hover styles) */}
          <div className="flex items-center space-x-2 sm:space-x-4 min-w-[120px] sm:min-w-[200px] justify-start">
            <span className="hidden sm:block">
              <FaWhatsapp className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
            </span>
            <span onClick={() => navigate('/authenticator')} className="cursor-pointer">
              <FaQrcode className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </span>
            <span onClick={() => setLoginOpen(true)}>
              <FaUser className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </span>
            <span className="relative" onClick={() => setCartOpen(true)}>
              <FaShoppingCart className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              {/* Optional cart badge */}
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 sm:h-5 sm:min-w-5 px-1 flex items-center justify-center text-[10px] sm:text-xs">
                {cartCount}
              </span>
            </span>
          </div>
        </div>

        {/* Secondary Navigation - Below Search Bar (no border/hover/focus) */}
        <div className="hidden md:block">
          <div className="flex items-center justify-center py-3 w-full">
            <div className="flex justify-between items-center w-full max-w-4xl px-6 mx-auto">
              {navigationItems.map((item, index) => (
                item.path ? (
                  <span
                    key={index}
                    className="text-white text-sm lg:text-lg font-medium whitespace-nowrap flex-1 text-center cursor-pointer"
                    onClick={() => navigate(item.path)}
                  >
                    {item.label}
                  </span>
                ) : (
                  <span
                    key={index}
                    className="text-white text-sm lg:text-lg font-medium whitespace-nowrap flex-1 text-center"
                  >
                    {item.label}
                  </span>
                )
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Login Dialog */}
      <LoginDialog open={loginOpen} onClose={() => setLoginOpen(false)} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </nav>
  );
};

export default Navbar;
