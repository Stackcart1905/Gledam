import React from 'react';

const TEXT = 'Built by Beasts, Seal Packed by Experts. ';
const REPEAT = Array.from({ length: 8 }).map(() => TEXT);

const BrandMarqueeStrip = () => {
  return (
  <section className="w-full my-10" style={{ backgroundColor: '#CCFF00' }}>
    <style>{`
      @keyframes marquee-left-slow {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
      @keyframes marquee-left-fast {
        0% { transform: translateX(0); }
        100% { transform: translateX(-100%); }
      }
    `}</style>
    <div className="relative overflow-hidden pt-3 pb-8">
      {/* Top outlined row (slow) */}
      <div className="whitespace-nowrap">
        <div
          className="flex"
          aria-hidden="true"
          style={{
            animation: 'marquee-left-slow 130s linear infinite',
            width: 'max-content',
          }}
        >
          <span
            className="px-6 font-extrabold leading-none"
            style={{
              color: '#CCFF00',
              WebkitTextStroke: '1px #000',
              fontSize: '80px',
              opacity: 0.35,
            }}
          >
            {REPEAT}
          </span>
          <span
            className="px-6 font-bold leading-none"
            style={{
              color: '#CCFF00',
              WebkitTextStroke: '1px #000',
              fontSize: '80px',
              opacity: 0.35,
            }}
          >
            {REPEAT}
          </span>
        </div>
      </div>

      {/* Middle solid row (faster, big, black) */}
      <div className="whitespace-nowrap my-0">
        <div
          className="flex"
          aria-hidden="true"
          style={{
            animation: 'marquee-left-fast 130s linear infinite',
            width: 'max-content',
          }}
        >
          <span className="px-6 font-black text-black leading-none" style={{ fontSize: '80px' }}>
            {REPEAT}
          </span>
          <span className="px-6 font-black text-black leading-none" style={{ fontSize: '80px' }}>
            {REPEAT}
          </span>
        </div>
      </div>

      {/* Bottom outlined row (slow) */}
      <div className="whitespace-nowrap">
        <div
          className="flex"
          aria-hidden="true"
          style={{
            animation: 'marquee-left-slow 140s linear infinite',
            width: 'max-content',
          }}
        >
          <span
            className="px-6 font-extrabold leading-none"
            style={{
              color: '#CCFF00',
              WebkitTextStroke: '1px #000',
              fontSize: '80px',
              opacity: 0.35,
            }}
          >
            {REPEAT}
          </span>
          <span
            className="px-6 font-extrabold leading-none"
            style={{
              color: '#CCFF00',
              WebkitTextStroke: '1px #000',
              fontSize: '80px',
              opacity: 0.35,
            }}
          >
            {REPEAT}
          </span>
        </div>
      </div>
    </div>
  </section>
  );
};

export default BrandMarqueeStrip;
