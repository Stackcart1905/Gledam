import React from 'react';
import { useCart } from '@/lib/cart/CartContext';
import { useNavigate } from 'react-router-dom';
import GledamLogo from '../common/GledamLogo';

// Specific categories and routes required
const categories = [
  { key: 'prowhey', title: 'Pro Whey Protein', route: '/prowhey', top: '#1c273dff', bottom: '#d6d9fbff' },
  { key: 'massgainer', title: 'Mass Gainer', route: '/massgainer', top: '#065F46', bottom: '#d2f8e6ff' },
  { key: 'creatine', title: 'Creatine', route: '/creatine', top: '#7C2D12', bottom: '#f9e7d3ff' },
  { key: 'peanutbutter', title: 'Peanut Butter', route: '/peanutbutter', top: '#1F2937', bottom: '#E5E7EB' },
];

const ShopByCategory = () => {
  const { addItem } = useCart();
  const navigate = useNavigate();
  return (
    <section className="w-full relative overflow-hidden" style={{ backgroundColor: '#ffffff' }}>
      {/* Subtle background with outlined brand name on left and full-height logo on right */}
      <div className="absolute inset-0 pointer-events-none select-none z-0 opacity-[0.12]">
        <div className="h-full w-full flex items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Left: Brand name (outlined) */}
          <div className="flex-1 flex items-center">
            <span
              className="block text-[96px] sm:text-[120px] lg:text-[150px] xl:text-[180px] leading-none font-black tracking-tight"
              style={{ WebkitTextStroke: '2px #000', color: 'transparent' }}
            >
              Gledam
            </span>
          </div>
          {/* Right: Logo scaled to section height */}
          <div className="flex-1 h-full flex items-center justify-end">
            <GledamLogo className="text-black h-[70%] sm:h-[75%] md:h-[85%] lg:h-[95%] w-auto" />
          </div>
        </div>
      </div>

      <div className="relative z-[1] w-full px-4 sm:px-6 lg:px-8 py-12">
        {/* Heading matching TalkOfTheTown */}
        <div className="mb-6">
          <h2 className="text-4xl font-bold tracking-tight">
            <span style={{ color: '#CCFF00' }}>|</span> <span className="text-black">Shop By Category</span>
          </h2>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <div key={cat.key} className="flex flex-col">
              {/* Image card only */}
              <div className="rounded-xl overflow-hidden border border-gray-200">
                <div
                  className="relative h-80 flex items-center justify-center"
                  style={{
                    backgroundImage: `linear-gradient(to bottom, ${cat.top}, ${cat.bottom})`,
                  }}
                >
                  {/* Watermark logo */}
                  <GledamLogo className="absolute inset-0 m-auto text-white opacity-20 w-[220px] h-auto" />
                  {/* Foreground brand chip matching request (thin border, filled with white) */}
                  <div className="relative z-[1]">
                    <span className="px-4 py-1 rounded-full text-sm font-semibold" style={{ color: '#000', backgroundColor: '#ffffff', border: '1px solid #000' }}>
                      Gledam
                    </span>
                  </div>
                </div>
              </div>

              {/* Separate text and button below the image card */}
              <div className="mt-4 flex flex-col items-center">
                <div className="text-base sm:text-2xl font-semibold  text-black">{cat.title}</div>
                <button
                  className="mt-4 w-full text-lg py-2 rounded-md focus:outline-none hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: '#CCFF00', color: '#000000' }}
                  onClick={() => navigate(cat.route)}
                >
                  Shop Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopByCategory;
