import React, { useState } from 'react';

const BeastStories = () => {
  const [hovered, setHovered] = useState(null);
  const cards = Array.from({ length: 5 }, (_, i) => i + 1);

  // Compute width so 5 cards fit in one line with gaps on large screens,
  // but cap at 8cm to match previous section design. Maintain 8:14 ratio.
  const cardWidth = 'min(8cm, calc((100% - 64px) / 5))'; // 64px ~ gap-4 * 4

  return (
    <section className="w-full bg-white">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-6">
          <h2 className="text-4xl font-bold tracking-tight">
            <span style={{ color: '#CCFF00' }}>|</span>{' '}
            <span className="text-black">Gledam Stories</span>
          </h2>
        </div>

        <div className="flex gap-4 justify-between items-stretch flex-nowrap">
          {cards.map((n, idx) => (
            <div
              key={n}
              className="relative"
              style={{ perspective: '1000px', width: cardWidth }}
              onMouseEnter={() => setHovered(idx)}
              onMouseLeave={() => setHovered(null)}
            >
              <div
                className="w-full h-full"
                style={{
                  position: 'relative',
                  aspectRatio: '8 / 14',
                  transition: 'transform 700ms',
                  transformStyle: 'preserve-3d',
                  transform: hovered === idx ? 'rotateY(180deg)' : 'rotateY(0deg)'
                }}
              >
                {/* Front */}
                <div
                  className="border border-gray-200 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backfaceVisibility: 'hidden'
                  }}
                >
                  {/* Placeholder front content */}
                  <span className="text-sm font-semibold">Card {n}</span>
                </div>

                {/* Back */}
                <div
                  className="border border-gray-200 rounded-lg flex items-center justify-center text-black"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    transform: 'rotateY(180deg)',
                    backfaceVisibility: 'hidden',
                    backgroundColor: '#CCFF00'
                  }}
                >
                  <span className="text-sm font-semibold">View Review</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BeastStories;
