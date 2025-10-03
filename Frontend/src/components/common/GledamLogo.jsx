import React from 'react';

const GledamLogo = ({ className = '', wordmark = true }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 640 200"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Gledam logo"
    >
      {/* Emblem: stylized G within circle */}
      <defs>
        <linearGradient id="g-shade" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.9" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.4" />
        </linearGradient>
      </defs>
      <g transform="translate(20,20)">
        <circle cx="80" cy="80" r="80" fill="none" stroke="currentColor" strokeWidth="10" opacity="0.6" />
        <path
          d="M120 120c-12 12-29 20-48 20-40 0-72-32-72-72S32 24 72 24c36 0 66 27 71 62H80"
          fill="none"
          stroke="currentColor"
          strokeWidth="16"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="80" cy="80" r="8" fill="currentColor" />
      </g>

      {wordmark && (
        <g transform="translate(200,45)" fill="currentColor">
          {/* Wordmark: Gledam, geometric sans inspired */}
          <path d="M0 90V0h24v66h36V48H36V24h48v66H0z" /> {/* G */}
          <path d="M100 24h24v66h-24V24z" /> {/* l */}
          <path d="M136 24h24v9c5-7 14-11 25-11 23 0 39 16 39 40s-16 40-39 40c-11 0-20-4-25-11v9h-24V24zm60 38c0-11-7-18-17-18s-17 7-17 18 7 18 17 18 17-7 17-18z" /> {/* e */}
          <path d="M240 24h24v9c6-7 15-11 27-11 21 0 35 12 35 36v32h-24V60c0-12-6-18-17-18s-19 7-19 22v26h-26V24z" /> {/* d */}
          <path d="M336 24h24v9c6-7 15-11 27-11 21 0 35 12 35 36v32h-24V60c0-12-6-18-17-18s-19 7-19 22v26h-26V24z" /> {/* a (reuse d-shape) */}
          <path d="M456 24h26l15 43 15-43h26l-28 66h-26L456 24z" /> {/* m */}
        </g>
      )}
    </svg>
  );
};

export default GledamLogo;
