import React, { useRef } from 'react';
import { useCart } from '@/lib/cart/CartContext';

const apparelImage = `data:image/webp;base64,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`;

const ApparelAccessories = () => {
  const items = Array.from({ length: 7 }, (_, i) => ({
    id: `apparel-${i}`,
    name: 'Oversize T-Shirt',
    rating: '4.6/5',
    price: 499,
    img: apparelImage,
  }));

  const trackRef = useRef(null);
  const { addItem } = useCart();
  // Auto slider removed per requirement; use manual scroll.

  // Keep original card sizing (no forced 6-per-view)

  return (
    <section className="w-full bg-white">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-10">
        {/* Heading */}
        <div className="mb-6">
          <h2 className="text-4xl font-bold tracking-tight">
            <span style={{ color: '#CCFF00' }}>|</span> <span className="text-black">Apparel &amp; Accessories</span>
          </h2>
        </div>

        {/* Slider to match TalkOfTheTown card sizing/style */}
        <div className="relative">
          <div
            ref={trackRef}
            className="flex gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory"
            style={{ scrollBehavior: 'smooth' }}
          >
            {items.map((item, idx) => {
              const baseWidth = 140; // px
              const step = 20; // px increase per card
              const width = baseWidth + idx * step;
              const height = 400; // match TalkOfTheTown image height
              return (
                <div key={item.id} className="snap-start" style={{ minWidth: width + 160 }}>
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-gray-100 flex items-center justify-center" style={{ width: '100%', height }}>
                      <img
                        src={item.img}
                        alt={item.name}
                        style={{ height: '100%', width: 'auto', objectFit: 'contain' }}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="p-3">
                      <div className="text-sm font-semibold text-black line-clamp-1">{item.name}</div>
                      <div className="text-xs text-gray-500 mt-1">Rating: {item.rating}</div>
                      <div className="text-sm font-bold text-black mt-1">₹{item.price}</div>
                      <button
                        className="mt-2 w-full !text-black text-sm font-semibold py-2 rounded-md focus:outline-none hover:opacity-80 transition-opacity border-none"
                        style={{ backgroundColor: '#CCFF00', color: '#000000' }}
                        onClick={() => addItem({ id: item.id, name: item.name, price: item.price, image: item.img })}
                      >
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* View All */}
        <div className="mt-8 flex justify-center">
          <button className="bg-black font-bold text-white px-6 py-2 rounded-full focus:outline-none">View All</button>
        </div>
      </div>
    </section>
  );
};

export default ApparelAccessories;
