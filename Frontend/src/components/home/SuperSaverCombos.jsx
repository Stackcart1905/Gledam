import React from 'react';

const LETTER_BG = '#CCFF00';

const Word = ({ text }) => {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {text.split('').map((ch, i) => (
        ch === ' ' ? (
          <span key={`space-${i}`} style={{ width: 24 }} />
        ) : (
          <span
            key={`${ch}-${i}`}
            className="inline-flex items-center justify-center font-extrabold"
            style={{
              fontSize: 'clamp(28px, 7vw, 84px)',
              lineHeight: 1,
              color: '#000000',
              backgroundColor: LETTER_BG,
              border: '4px solid #000000',
              borderRadius: 12,
              padding: '8px 14px',
              minWidth: 44,
              boxShadow: 'inset 0 0 0 2px #CCFF00'
            }}
          >
            {ch}
          </span>
        )
      ))}
    </div>
  );
};

const SuperSaverCombos = () => {
  return (
    <section className="w-full bg-white">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center gap-4 text-center select-none">
          <Word text="SUPER SAVER" />
          <Word text="COMBOS" />
        </div>
      </div>
    </section>
  );
};

export default SuperSaverCombos;
