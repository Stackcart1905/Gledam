import React, { useRef, useState, useEffect } from 'react';
import { useCart } from '@/context/useCart';
import { useNavigate } from 'react-router-dom';
import { getProducts } from '@/lib/data/products';

const categories = [
  { key: 'bestseller', label: 'bestseller' },
  { key: 'creatine', label: 'creatine' },
  { key: 'protein', label: 'protein' },
];

// Shuffle helper
const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const TalkOfTheTown = () => {
  const [active, setActive] = useState('bestseller');
  const trackRef = useRef(null);
  const { addItem } = useCart();
  const { items: cartItems } = useCart();
  const qtyOf = (id) => cartItems.find(i => i.id === id)?.qty || 0;
  const navigate = useNavigate();

  const [proteinItems, setProteinItems] = useState([]);
  const [creatineItems, setCreatineItems] = useState([]);
  const [multivitaminItems, setMultivitaminItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const products = await getProducts();
        
        const protein = products.filter(p => p.category === 'Protein Powder').slice(0, 6).map(p => ({
          id: p.id,
          name: p.name,
          rating: '4.5/5',
          price: p.price,
          img: p.imageUrl,
          type: 'protein',
        }));
        setProteinItems(protein);
        
        const creatine = products.filter(p => p.category === 'Creatine').slice(0, 6).map(p => ({
          id: p.id,
          name: p.name,
          rating: '4.6/5',
          price: p.price,
          img: p.imageUrl,
          type: 'creatine',
        }));
        setCreatineItems(creatine);
        
        const multivitamin = products.filter(p => p.category === 'Multivitamins').slice(0, 6).map(p => ({
          id: p.id,
          name: p.name,
          rating: '4.4/5',
          price: p.price,
          img: p.imageUrl,
          type: 'multivitamin',
        }));
        setMultivitaminItems(multivitamin);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Build bestseller: 3 of each category (protein, creatine, multivitamin), shuffled. If multivitamin missing, fill to 9 with protein/creatine.
  const bestsellerMixed = () => {
    if (loading) return [];
    const take = (arr, n) => arr.slice(0, n);
    const bestProtein = take(proteinItems, 3);
    const bestCreatine = take(creatineItems, 3);
    const bestMulti = take(multivitaminItems, 3);
    let mixed = [...bestProtein, ...bestCreatine, ...bestMulti];
    const fillers = [...proteinItems, ...creatineItems];
    let k = 0;
    while (mixed.length < 9 && fillers.length > 0) {
      const base = fillers[k % fillers.length];
      mixed.push({ ...base, id: `${base.id}-dup${k}` });
      k++;
    }
    return shuffle(mixed);
  };

  const itemsByCategory = {
    bestseller: bestsellerMixed(),
    creatine: creatineItems,
    protein: proteinItems,
    multivitamin: multivitaminItems,
  };

  // Keep original card sizing

  // Auto-scroll removed per requirement. Manual scroll only.

  return (
    <section className="w-full bg-white">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
        {/* Heading */}
        <div className="mb-6">
          <h2 className="text-4xl font-bold tracking-tight">
            <span style={{ color: '#CCFF00' }}>|</span> <span className="text-black">Talk of The Town</span>
          </h2>
        </div>

    {/* Categories */}
    <div className="flex items-center gap-3 mb-6">
            {categories.map((cat) => (
                <button
                    key={cat.key}
                    onClick={() => setActive(cat.key)}
          className={`text-sm uppercase tracking-wider font-bold rounded-full px-5 py-1.5 transition-colors ${
            active === cat.key
            ? '!bg-black !text-white'
            : '!bg-white !text-black'
          }`}
          style={active === cat.key 
            ? { backgroundColor: '#000000', color: '#ffffff' }
            : { backgroundColor: '#ffffff', color: '#000000' }
          }
                >
                    {cat.label}
                </button>
            ))}
        </div>

        {/* Slider with hidden controls */}
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
              {itemsByCategory[active].map((item, idx) => {
                const baseWidth = 140; // px
                const step = 20; // px increase per card
                const width = baseWidth + idx * step;
                const height = 400; // fixed equal height for all product images
                return (
                  <div key={item.id} className="snap-start" style={{ minWidth: width + 160 }}>
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="bg-gray-100 flex items-center justify-center" style={{ width: '100%', height }}>
                        {item.img ? (
                          <img
                            src={item.img}
                            alt={item.name}
                            style={{ height: '100%', width: 'auto', objectFit: 'contain' }}
                            loading="lazy"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200" />
                        )}
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
          )}
        </div>

        {/* View All */}
        <div className="mt-8 flex justify-center">
          <button
            className="bg-black font-bold text-white px-6 py-2 rounded-full focus:outline-none"
            onClick={() => navigate('/trending')}
          >
            View All
          </button>
        </div>
      </div>
    </section>
  );
};

export default TalkOfTheTown;
