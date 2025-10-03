import React, { useEffect, useRef } from 'react';

const Testimonials = () => {
  const count = 4; // exactly four cards
  const items = Array.from({ length: count }, (_, i) => i + 1);
  const trackRef = useRef(null);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    // Center first card
    const first = el.children[0];
    if (first) {
      el.scrollTo({ left: first.offsetLeft, behavior: 'smooth' });
    }
  }, []);

  return (
    <section className="w-full bg-white">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-10">
        {/* Heading */}
        <div className="mb-6">
          <h2 className="text-4xl font-bold tracking-tight">
            <span style={{ color: '#CCFF00' }}>|</span>{' '}
            <span className="text-black">Testimonials</span>
          </h2>
        </div>

        {/* Cards similar to Learning & Flexing */}
        <div className="relative">
          <div
            ref={trackRef}
            className="flex gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory"
            style={{ scrollBehavior: 'smooth' }}
          >
            {items.map((n) => (
              <div key={n} className="snap-start" style={{ minWidth: '8cm' }}>
                <div
                  className="border border-gray-200 rounded-lg bg-gray-100 p-4 flex flex-col justify-between"
                  style={{ width: '8.5cm', height: '14cm' }}
                  aria-label={`Testimonial ${n}`}
                >
                  <div className="space-y-3">
                    <div className="h-3 w-2/3 bg-gray-300 rounded" />
                    <div className="h-3 w-5/6 bg-gray-300 rounded" />
                    <div className="h-3 w-4/6 bg-gray-300 rounded" />
                    <div className="h-3 w-3/5 bg-gray-300 rounded" />
                  </div>
                  <div className="mt-6 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gray-300" />
                    <div>
                      <div className="h-3 w-24 bg-gray-300 rounded" />
                      <div className="mt-2 h-3 w-16 bg-gray-300 rounded" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
