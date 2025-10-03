import React from 'react';

const ChatbotFloatingLogo = ({ onClick }) => {
  return (
    <div
      style={{
        position: 'fixed',
        left: '2rem',
        bottom: '2rem',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #222 60%, #4f8cff 100%)',
        borderRadius: '50%',
        width: '70px',
        height: '70px',
        boxShadow: '0 6px 24px rgba(0,0,0,0.18)',
        border: 'none',
        transition: 'box-shadow 0.2s, transform 0.1s',
        cursor: 'pointer',
      }}
      onClick={onClick}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick && onClick(); } }}
      role="button"
      tabIndex={0}
      aria-label="Chatbot"
    >
      {/* Modern chat bubble icon */}
      <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="19" cy="19" r="19" fill="#fff" />
        <rect x="8" y="12" width="22" height="13" rx="6.5" fill="#4f8cff" />
        <path d="M19 25c-2.5 0-4.5-1.5-4.5-3.5h9c0 2-2 3.5-4.5 3.5z" fill="#4f8cff" />
        <ellipse cx="15.5" cy="18.5" rx="1.5" ry="1.5" fill="#fff" />
        <ellipse cx="19" cy="18.5" rx="1.5" ry="1.5" fill="#fff" />
        <ellipse cx="22.5" cy="18.5" rx="1.5" ry="1.5" fill="#fff" />
      </svg>
      {/* Online dot */}
      <span
        style={{
          position: 'absolute',
          left: '54px',
          bottom: '12px',
          width: '15px',
          height: '15px',
          background: 'radial-gradient(circle at 60% 40%, #25D366 80%, #1fa855 100%)',
          borderRadius: '50%',
          border: '2.5px solid #fff',
          boxShadow: '0 0 8px #25D366',
        }}
      />
    </div>
  );
};

export default ChatbotFloatingLogo;
