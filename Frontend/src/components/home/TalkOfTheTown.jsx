import React, { useRef, useState } from 'react';
import { useCart } from '@/lib/cart/CartContext';
import { useNavigate } from 'react-router-dom';

const categories = [
  { key: 'bestseller', label: 'bestseller' },
  { key: 'creatine', label: 'creatine' },
  { key: 'protein', label: 'protein' },
];

// Provided image links
const providedProteinLink =
  'https://www.bing.com/images/search?view=detailV2&ccid=2MRzMtHa&id=4BA3809F1ED480410C855757C265068F18F3B0BE&thid=OIP.2MRzMtHaA4DVmDzWH_1K8AHaHg&mediaurl=https%3a%2f%2fonemg.gumlet.io%2fl_watermark_346%2cw_690%2ch_700%2fa_ignore%2cw_690%2ch_700%2cc_pad%2cq_auto%2cf_auto%2fc4b851abdaa14773afe44eff17ca655f.jpg&exph=700&expw=690&q=beastlife+products&FORM=IRPRST&ck=393C57511AAAE8C9D444AEB968863C2E&selectedIndex=5&itb=1';
const providedCreatineLink =
  'https://th.bing.com/th/id/OIP.oUjph8lDeW4oT6jC-x19sQHaHa?w=218&h=217&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3';
// Multivitamin demo image link
const providedMultivitaminLink = 'https://th.bing.com/th/id/OIP.VKOxY2W35pJm1-5ltV-K_gHaHa?w=177&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3';

// Resolve direct image URL when a Bing result URL contains a mediaurl param
const resolveImageSrc = (url) => {
  try {
    const u = new URL(url);
    const media = u.searchParams.get('mediaurl');
    return media ? decodeURIComponent(media) : url;
  } catch {
    return url;
  }
};

const proteinSrc = resolveImageSrc(providedProteinLink);
const creatineSrc = resolveImageSrc(providedCreatineLink);
const multivitaminSrc = providedMultivitaminLink ? resolveImageSrc(providedMultivitaminLink) : '';

// Build demo items per category
const buildProteinItems = (count = 6) =>
  Array.from({ length: count }, (_, i) => ({
    id: `protein-${i}`,
    name: `Protein ${i + 1}`,
    rating: '4.5/5',
    price: 5499,
    img: proteinSrc,
    type: 'protein',
  }));

const buildCreatineItems = (count = 6) =>
  Array.from({ length: count }, (_, i) => ({
    id: `creatine-${i}`,
    name: `Creatine ${i + 1}`,
    rating: '4.6/5',
    price: 499,
    img: creatineSrc,
    type: 'creatine',
  }));

const buildMultivitaminItems = (count = 4) =>
  (multivitaminSrc
    ? Array.from({ length: count }, (_, i) => ({
        id: `multivitamin-${i}`,
        name: `Multivitamin ${i + 1}`,
        rating: '4.4/5',
        price: 699,
        img: multivitaminSrc,
        type: 'multivitamin',
      }))
    : []);

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
  const navigate = useNavigate();

  const proteinItems = buildProteinItems(6);
  const creatineItems = buildCreatineItems(6);
  const multivitaminItems = buildMultivitaminItems(6); // will be [] if not provided

  // Build bestseller: 3 of each category (protein, creatine, multivitamin), shuffled. If multivitamin missing, fill to 9 with protein/creatine.
  const bestsellerMixed = () => {
    const bestProtein = buildProteinItems(3).map((item, i) => ({ ...item, id: `best-${item.id}-${i}` }));
    const bestCreatine = buildCreatineItems(3).map((item, i) => ({ ...item, id: `best-${item.id}-${i}` }));
    const bestMulti = buildMultivitaminItems(3).map((item, i) => ({ ...item, id: `best-${item.id}-${i}` }));
    let mixed = [...bestProtein, ...bestCreatine, ...bestMulti];
    const fillers = [...bestProtein, ...bestCreatine];
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
  };

  // Keep original card sizing

  const scrollBy = (delta) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: delta, behavior: 'smooth' });
  };

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
                        onClick={() =>
                          addItem({ id: item.id, name: item.name, price: item.price, image: item.img })
                        }
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
