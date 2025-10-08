import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaWhatsapp, FaQrcode, FaUser, FaShoppingCart, FaSearch } from 'react-icons/fa';
import LoginDialog from "@/components/common/LoginDialog";
import CartDrawer from "@/components/common/CartDrawer";
import { useCart } from "@/lib/cart/CartContext";

// Data for the Product Dropdown
const productCategories = [
  { 
    name: "Shop All", 
    imageUrl: "https://images.unsplash.com/photo-1709976142774-ce1ef41a8378?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
    link: "/product" 
  },
  { 
    name: "L Carnitine", 
    imageUrl: "https://images.unsplash.com/photo-1724160167551-2ffc3d7ca809?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
    link: "/lcarnitine" 
  },
  { 
    name: "Pre Workout", 
    imageUrl: "https://images.unsplash.com/photo-1693996047008-1b6210099be1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
    link: "/preworkout" 
  },
  { 
    name: "Roti 2.0", 
    imageUrl: "https://images.unsplash.com/photo-1567337710282-00832b415979?q=80&w=1330&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
    link: "/roti" 
  },
  { 
    name: "Pro Whey Protein", 
    imageUrl: "https://images.unsplash.com/photo-1680265158261-5fd6ba5d9959?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
    link: "/prowhey" 
  },
  { 
    name: "Wellness", 
    imageUrl: "https://images.unsplash.com/photo-1704650311190-7eeb9c4f6e11?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
    link: "/wellness" 
  },
  { 
    name: "Mass Gainer", 
    imageUrl: "https://m.media-amazon.com/images/I/81EtoZyZJgL._UF1000%2C1000_QL80_.jpg", 
    link: "/massgainer" 
  },
  { 
    name: "Omegas", 
    imageUrl: "https://www.ruleoneproteins.com/cdn/shop/files/mass-gainer_5lb_chocolate-fudge_front.png?v=1752521802&width=1920", 
    link: "/omegas" 
  },
  { 
    name: "Peanut Butter", 
    imageUrl: "https://plus.unsplash.com/premium_photo-1701210417939-8663fe6241bc?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
    link: "/peanutbutter" 
  },
  { 
    name: "Isorich Whey Protein", 
    imageUrl: "https://g6sportsnutrition.com/cdn/shop/products/G6_MASS_PRO-6.7lb-Vanilla%402x.jpg?v=1528476059", 
    link: "/isorich" 
  },
  { 
    name: "Multivitamins", 
    imageUrl: "https://images.unsplash.com/photo-1665757516805-ead01c014ceb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Z3VtbXklMjB2aXRhbWluc3xlbnwwfHwwfHx8MA%3D%3D", 
    link: "/multivitamins" 
  },
  { 
    name: "Creatine", 
    imageUrl: "https://images.unsplash.com/photo-1724160167780-1aef4db75030?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
    link: "/creatine" 
  },
  { 
    name: "BCAA", 
    imageUrl: "https://images.unsplash.com/photo-1709976142888-6dc0ed1ed78c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
    link: "/bcaa" 
  },
  { 
    name: "Accessories", 
    imageUrl: "https://images.unsplash.com/photo-1577991712260-4ee45603dab8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
    link: "/accessories" 
  },
];
// Product Dropdown Sub-Component
const ProductDropdown = ({ products, isVisible, navigate }) => {
  if (!isVisible) return null;

  return (
    <div 
      className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 z-50 bg-white rounded-lg shadow-2xl p-6 border border-gray-100 text-black"
      style={{ width: '400px', minWidth: '350px' }}
    >
      <div className="grid grid-cols-4 gap-x-4 gap-y-6">
        {products.map((product, index) => (
          <div
            key={index}
            role="button"
            tabIndex={0}
            onClick={() => navigate(product.link)}
            onKeyDown={(e) => { if (e.key === 'Enter') navigate(product.link) }}
            className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-100 transition cursor-pointer"
          >
            <div className="w-12 h-12 mb-1 rounded-md overflow-hidden flex items-center justify-center">
                {/* 🛑 RE-INSERTED IMAGE TAG HERE */}
                <img 
                    src={product.imageUrl} // Reads the URL from your productCategories array
                    alt={product.name} 
                    className="object-cover w-full h-full" 
                    loading="lazy"
                />
            </div>
            
            {/* The text overlap fix remains */}
            <p className="text-center text-xs font-medium leading-tight">
              {product.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};



const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [loginOpen, setLoginOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown visibility

  const { items } = useCart();
  const navigate = useNavigate();
  const cartCount = useMemo(() => items.reduce((n, i) => n + (i.qty || 1), 0), [items]);

  const navigationItems = [
    // 'Product' is handled separately below for the hover effect
    { label: 'Our Story', path: '/about' },
    { label: 'Authenticity Guaranteed', path: '/authenticator' },
    { label: 'Blogs', path: '/blogs' },
    { label: 'Track My Order', path: '/track-order'}
  ];

  return (
    <nav className="bg-black text-white w-full">
      {/* Main Navbar */}
      <div className="w-full px-4 sm:px-6 lg:px-10 pt-4 pb-4">
        <div className="flex items-center justify-between h-16 w-full">
          
          {/* Left - Gledam Logo (ORIGINAL NAME RETAINED) */}
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

          {/* Center - Search Bar - UNCHANGED */}
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

          {/* Right - Icons - UNCHANGED */}
          <div className="flex items-center space-x-2 sm:space-x-4 min-w-[120px] sm:min-w-[200px] justify-start">
            <span className="hidden sm:block">
              <FaWhatsapp className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
            </span>
            <span onClick={() => navigate('/authenticator')} className="cursor-pointer">
              <FaQrcode className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </span>
            <span onClick={() => setLoginOpen(true)} className="cursor-pointer">
              <FaUser className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </span>
            <span className="relative cursor-pointer" onClick={() => setCartOpen(true)}>
              <FaShoppingCart className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              {/* Optional cart badge */}
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 sm:h-5 sm:min-w-5 px-1 flex items-center justify-center text-[10px] sm:text-xs">
                {cartCount}
              </span>
            </span>
          </div>
        </div>

        {/* Secondary Navigation - Below Search Bar */}
        <div className="hidden md:block">
          <div className="flex items-center justify-center py-3 w-full">
            <div className="flex justify-center items-center w-full max-w-4xl px-6 mx-auto">
              
              {/* NEW: Product Button with Hover Dropdown Logic */}
              <div
                className="relative h-full flex-1 text-center"
                // 🔑 Hover logic is applied to this wrapper div
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <span
                  className="text-white text-sm lg:text-lg font-medium whitespace-nowrap cursor-pointer px-2 py-1 flex items-center justify-center"
                  role="button"
                  tabIndex={0}
                  // We can keep the click/enter action, but it's no longer necessary to *open* the menu
                  onClick={() => setIsDropdownOpen(prev => !prev)} 
                  onKeyDown={(e) => { if (e.key === 'Enter') setIsDropdownOpen(prev => !prev) }}
                >
                  Product
                  <svg 
                      className={`w-4 h-4 ml-1 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : 'rotate-0'}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                  >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
                
                {/* Product Dropdown component */}
                <ProductDropdown products={productCategories} isVisible={isDropdownOpen} navigate={navigate} />
              </div>
              
              {/* Other Navigation Items */}
              {navigationItems.map((item, index) => (
                <span
                  key={index}
                  className="text-white text-sm lg:text-lg font-medium whitespace-nowrap flex-1 text-center cursor-pointer"
                  onClick={() => navigate(item.path)}
                  role="link"
                  tabIndex={0}
                >
                  {item.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Dialogs/Drawers - UNCHANGED */}
      <LoginDialog open={loginOpen} onClose={() => setLoginOpen(false)} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </nav>
  );
};

export default Navbar;