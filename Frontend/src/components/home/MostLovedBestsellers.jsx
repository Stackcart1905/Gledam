import React, { useMemo, useRef } from 'react';
import { useCart } from '@/lib/cart/CartContext';
import { useNavigate } from 'react-router-dom';
import { getProducts } from '@/lib/data/products';

const MostLovedBestsellers = () => {
  const trackRef = useRef(null);
  const { addItem, items: cartItems } = useCart();
  const qtyOf = (id) => cartItems.find(i => i.id === id)?.qty || 0;
  const navigate = useNavigate();

  const items = useMemo(() => {
    const all = getProducts();
    const proteins = all.filter(p => p.category === 'Protein Powder');
    const creatines = all.filter(p => p.category === 'Creatine');
    const merged = [];
    const max = Math.max(proteins.length, creatines.length);
    for (let i = 0; i < max; i++) {
      if (i < proteins.length) merged.push(proteins[i]);
      if (i < creatines.length) merged.push(creatines[i]);
    }
    return merged.slice(0, 9).map((p, idx) => ({
      id: p.id || `ml-${idx}`,
      name: p.name,
      rating: '4.7/5',
      price: p.price,
      img: p.imageUrl,
    }));
  }, []);

  // Keep original card sizing

  // Auto slider removed per requirement; allow manual horizontal scroll instead.

  return (
    <section className="w-full bg-white">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
        <div className="mb-4 sm:mb-6">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
            <span style={{ color: '#CCFF00' }}>|</span> <span className="text-black">Most Loved Bestsellers</span>
          </h2>
        </div>

        <div className="relative">
          <div
            ref={trackRef}
            className="flex gap-3 sm:gap-4 lg:gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-2"
            style={{ scrollBehavior: 'smooth' }}
          >
            {items.map((item, idx) => {
              const baseWidth = 140; // px
              const step = 20; // px increase per card
              const width = baseWidth + idx * step;
              const height = 400; // fixed equal height
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
                        {qtyOf(item.id) > 0 ? `${qtyOf(item.id)} added` : 'Add to cart'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            className="bg-black font-bold text-white px-6 py-2 rounded-full focus:outline-none"
            onClick={() => navigate('/most-loved-bestsellers')}
          >
            View All
          </button>
        </div>
      </div>
    </section>
  );
};

export default MostLovedBestsellers;
