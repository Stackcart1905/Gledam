import React, { useRef } from 'react';

const LearningFlexing = () => {
  const placeholders = Array.from({ length: 12 }, (_, i) => i + 1);
  const trackRef = useRef(null);

  // Auto slider removed per requirement; manual scroll only.

  return (
    <section className="w-full bg-white">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-6">
          <h2 className="text-4xl font-bold tracking-tight">
            <span style={{ color: '#CCFF00' }}>|</span>{' '}
            <span className="text-black">Learning &amp; Flexing</span>
          </h2>
        </div>

  {/* Slider of blank video cards */}
        <div className="relative">
          <div
            ref={trackRef}
            className="flex gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory"
            style={{ scrollBehavior: 'smooth' }}
          >
            {placeholders.map((n) => {
              // 4 cards per view: gap-6 is 24px => total gaps = 24 * 3 = 72px
              const cardWidth = 'calc((100% - 72px) / 4)';
              const height = 480; // 20% more than previous 400px
              return (
                <div key={n} className="snap-start" style={{ minWidth: cardWidth, width: cardWidth }}>
                  <div
                    className="border border-gray-200 rounded-lg bg-gray-300 flex items-center justify-center"
                    style={{ width: '100%', height }}
                    aria-label={`Video placeholder ${n}`}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearningFlexing;
