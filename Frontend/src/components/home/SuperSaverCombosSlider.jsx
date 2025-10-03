import React, { useMemo, useRef } from 'react';
import { useCart } from '@/lib/cart/CartContext';

const resolveImageSrc = (url) => {
  try {
    const u = new URL(url);
    const media = u.searchParams.get('mediaurl');
    return media ? decodeURIComponent(media) : url;
  } catch {
    return url;
  }
};

const rawImg = 'https://th.bing.com/th/id/OIP.UqWqe2NXjG21PPXZ7nq9BAHaHa?w=199&h=199&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3';
const imgSrc = resolveImageSrc(rawImg);

const SuperSaverCombosSlider = () => {
  const discount = 15;
  const { addItem } = useCart();
  const calcPrice = (mrp, pct) => Math.round(mrp * (1 - pct / 100));
  const items = useMemo(
    () => Array.from({ length: 7 }, (_, i) => ({
      id: `combo-${i}`,
      name: 'Protein  + Creatine',
      rating: '4.7/5',
      mrp: 5999,
      price: calcPrice(5999, discount),
      img: imgSrc,
    })),
    []
  );

  const pctOff = () => discount;

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
                      <div className="text-sm font-bold text-black mt-1 flex items-center gap-2">
                        <span className="line-through text-gray-400">₹{item.mrp}</span>
                        <span>₹{item.price}</span>
                        <span className="text-green-600 text-xs font-semibold">{pctOff()}% OFF</span>
                      </div>
                      <button
                        className="mt-2 w-full !text-black text-sm font-semibold py-2 rounded-md focus:outline-none hover:opacity-80 transition-opacity border-none"
                        style={{ backgroundColor: '#CCFF00', color: '#000000' }}
                        onClick={() => addItem({ id: item.id, name: item.name, price: item.price, mrp: item.mrp, image: item.img })}
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
