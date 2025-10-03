import React, { useEffect, useRef } from 'react';

const Gledamgram = () => {
  const cards = Array.from({ length: 18 }, (_, i) => i + 1); // more cards to enable slider
  const trackRef = useRef(null);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    // optional: snap to start
    el.scrollTo({ left: 0, behavior: 'smooth' });
  }, []);

  // Card dimensions: ensure exactly 6 per row, larger than before, square-ish
  // gap-4 = 16px -> 5 gaps = 80px
  const cardWidth = 'calc((100% - 80px) / 6)';

  return (
    <section className="w-full bg-white">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-6 flex items-center gap-3">
          <h2 className="text-4xl font-bold tracking-tight flex items-center gap-2">
            <span style={{ color: '#CCFF00' }}>|</span>
            <span className="text-black flex items-center gap-3">
              {/* Instagram outline icon (refined, slightly lowered for baseline alignment) */}
              <svg className="relative top-[2px]" width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2.75" y="2.75" width="18.5" height="18.5" rx="5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="12" cy="12" r="4.6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="17.4" cy="6.6" r="1.4" fill="currentColor" />
              </svg>
              Gledamgram
            </span>
          </h2>
        </div>

        <div className="relative">
          <div
            ref={trackRef}
            className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory"
            style={{ scrollBehavior: 'smooth' }}
          >
            {cards.map((n) => (
              <div key={n} className="snap-start" style={{ minWidth: cardWidth, width: cardWidth }}>
                <div
                  className="border border-gray-200 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500"
                  style={{ aspectRatio: '10 / 17' }}
                >
                  <span className="text-sm font-semibold">Post {n}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="mt-8 border-t border-black" />

        {/* Back to Top button */}
        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-2 font-semibold text-black hover:underline"
            aria-label="Back to top"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 19V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M6 11l6-6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to Top
          </button>
        </div>
      </div>
    </section>
  );
};

export default Gledamgram;
