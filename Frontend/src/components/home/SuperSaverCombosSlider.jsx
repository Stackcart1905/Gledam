import React, { useMemo, useRef } from 'react';
import { useCart } from '@/lib/cart/CartContext';
import { getProductsByCategory } from '@/lib/data/products';

const SuperSaverCombosSlider = () => {
  const { addItem } = useCart();
  const items = useMemo(() => getProductsByCategory('Super Saver Combo'), []);

  const trackRef = useRef(null);
  // Auto slider removed; manual scroll only per requirement.

  // Keep original card sizing; do not force 6-per-view

  return (
    <section className="w-full bg-white">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-10">
        {/* Slider (TalkOfTheTown theme) */}
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
              const height = 480; // larger image area
              return (
                <div key={item.id} className="snap-start" style={{ minWidth: width + 160 }}>
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-gray-100 flex items-center justify-center" style={{ width: '100%', height }}>
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        style={{ height: '100%', width: 'auto', objectFit: 'contain' }}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="p-3">
                      <div className="text-sm font-semibold text-black line-clamp-1">{item.name}</div>
                      <div className="text-xs text-gray-500 mt-1">Rating: {item.rating || '4.7/5'}</div>
                      <div className="text-sm font-bold text-black mt-1 flex items-center gap-2">
                        {item.mrp ? <span className="line-through text-gray-400">₹{item.mrp}</span> : null}
                        <span>₹{item.price}</span>
                        {item.mrp && item.price && item.price < item.mrp ? (
                          <span className="text-green-600 text-xs font-semibold">
                            {Math.round((1 - item.price / item.mrp) * 100)}% OFF
                          </span>
                        ) : null}
                      </div>
                      <button
                        className="mt-2 w-full !text-black text-sm font-semibold py-2 rounded-md focus:outline-none hover:opacity-80 transition-opacity border-none"
                        style={{ backgroundColor: '#CCFF00', color: '#000000' }}
                        onClick={() => addItem({ id: item.id, name: item.name, price: item.price, mrp: item.mrp, image: item.imageUrl })}
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

export default SuperSaverCombosSlider;
