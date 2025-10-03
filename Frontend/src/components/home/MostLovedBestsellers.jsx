import React, { useRef } from 'react';
import { useCart } from '@/lib/cart/CartContext';

const proteinLink =
  'https://www.bing.com/images/search?view=detailV2&ccid=2MRzMtHa&id=4BA3809F1ED480410C855757C265068F18F3B0BE&thid=OIP.2MRzMtHaA4DVmDzWH_1K8AHaHg&mediaurl=https%3a%2f%2fonemg.gumlet.io%2fl_watermark_346%2cw_690%2ch_700%2fa_ignore%2cw_690%2ch_700%2cc_pad%2cq_auto%2cf_auto%2fc4b851abdaa14773afe44eff17ca655f.jpg&exph=700&expw=690&q=beastlife+products&FORM=IRPRST&ck=393C57511AAAE8C9D444AEB968863C2E&selectedIndex=5&itb=1';
const creatineLink =
  'https://th.bing.com/th/id/OIP.oUjph8lDeW4oT6jC-x19sQHaHa?w=218&h=217&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3';

const resolveImageSrc = (url) => {
  try {
    const u = new URL(url);
    const media = u.searchParams.get('mediaurl');
    return media ? decodeURIComponent(media) : url;
  } catch {
    return url;
  }
};

const proteinSrc = resolveImageSrc(proteinLink);
const creatineSrc = resolveImageSrc(creatineLink);

const MostLovedBestsellers = () => {
  const trackRef = useRef(null);
  const { addItem } = useCart();

  const items = Array.from({ length: 9 }, (_, i) => ({
    id: `ml-${i}`,
    name: (i % 2 === 0 ? 'Protein ' : 'Creatine ') + (i + 1),
    rating: '4.7/5',
    price: i % 2 === 0 ? 5499 : 499,
    img: i % 2 === 0 ? proteinSrc : creatineSrc,
  }));

  // Keep original card sizing

  // Auto slider removed per requirement; allow manual horizontal scroll instead.

  return (
    <section className="w-full bg-white">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-6">
          <h2 className="text-4xl font-bold tracking-tight">
            <span style={{ color: '#CCFF00' }}>|</span> <span className="text-black">Most Loved Bestsellers</span>
          </h2>
        </div>

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

        <div className="mt-8 flex justify-center">
          <button className="bg-black font-bold text-white px-6 py-2 rounded-full focus:outline-none">View All</button>
        </div>
      </div>
    </section>
  );
};

export default MostLovedBestsellers;
