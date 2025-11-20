import React, { useRef, useState, useEffect } from 'react';
import { useCart } from '@/context/useCart';
import { useNavigate } from 'react-router-dom';
import { getProductsByCategory } from '@/lib/data/products';

const ApparelAccessories = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const list = await getProductsByCategory('Apparel & Accessories');
        // Bring specific items to front if present
        const priority = ['T-Shirt', 'Wrist', 'Belt', 'Shaker'];
        const sorted = [...list].sort((a, b) => {
          const ai = priority.findIndex(k => a.name.toLowerCase().includes(k.toLowerCase()));
          const bi = priority.findIndex(k => b.name.toLowerCase().includes(k.toLowerCase()));
          return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
        });
        const mappedItems = sorted.map(p => ({ id: p.id, name: p.name, rating: '4.6/5', price: p.price, img: p.imageUrl }));
        setItems(mappedItems);
      } catch (error) {
        console.error('Failed to fetch apparel products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const trackRef = useRef(null);
  const { addItem } = useCart();
  const navigate = useNavigate();
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
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
          ) : (
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
          )}
        </div>

        {/* View All */}
        <div className="mt-8 flex justify-center">
          <button
            className="bg-black font-bold text-white px-6 py-2 rounded-full focus:outline-none"
            onClick={() => navigate('/apparel-accessories')}
          >
            View All
          </button>
        </div>
      </div>
    </section>
  );
};

export default ApparelAccessories;
