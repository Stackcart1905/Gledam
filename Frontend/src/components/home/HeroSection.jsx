import React, { useState } from 'react';

const slides = [
  {
    id: 0,
    title: 'Gledam Protein',
    tag: 'New Launch • Sale',
    specs: ['Whey Isolate', '24g Protein', '5.5g BCAA', 'Low Sugar'],
    bg: 'from-red-600 via-red-500 to-red-600'
  },
  {
    id: 1,
    title: 'Gledam Creatine',
    tag: 'Buy any three creatine 999',
    specs: ['Monohydrate', 'Micronized', 'Fast Absorption', 'Pure'],
    bg: 'from-slate-800 via-slate-700 to-slate-800'
  }
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);

  // Auto-rotation removed per requirement. current can be changed with future manual controls if added.

  return (
    <section className="w-full text-white select-none">
      {/* Height ~2.5x-3x of navbar (navbar ~64px) */}
      <div className="relative overflow-hidden bg-gray-800">
        <div className="min-h-[280px] sm:min-h-[320px] md:min-h-[384px] lg:min-h-[440px] w-full">
          {/* Slider track */}
          <div
            className="flex w-[200%] transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${current * 50}%)` }}
          >
            {slides.map((s) => (
              <div key={s.id} className="min-w-full">
                <div className={`h-full w-full bg-gray-800`}>
                  {/* Blank space reserved for picture */}
                  <div className="h-full w-full" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots indicator (non-interactive) */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2">
          {slides.map((s, i) => (
            <span
              key={s.id}
              className={`h-1.5 w-6 rounded-full ${i === current ? 'bg-white' : 'bg-white/40'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
