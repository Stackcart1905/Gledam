import React from 'react';

const ChatbotPanel = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div
      style={{
        position: 'fixed',
        left: '1rem',
        bottom: '1.5rem',
        top: '5rem', 
        zIndex: 1100,
        width: '380px',
        maxWidth: '90vw',
        display: 'flex',
        flexDirection: 'column',
        background: '#ffffff',
        borderRadius: '14px',
        boxShadow: '0 12px 40px rgba(0,0,0,0.25)',
        overflow: 'hidden',
      }}
      role="dialog"
      aria-label="BeastGPT Chat"
    >
      {/* Header */}
      <div
        style={{
          background: '#111',
          color: '#fff',
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(255,255,255,0.08)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: '50%',
              background: '#fff',
              display: 'grid',
              placeItems: 'center',
            }}
          >
            {/* Placeholder avatar */}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="7" r="4" fill="#111"/>
              <path d="M3 21c0-4 4-7 9-7s9 3 9 7" fill="#111"/>
            </svg>
          </div>
          <div style={{ lineHeight: 1.1 }}>
            <div style={{ fontWeight: 800 }}>GledamGPT</div>
            <div style={{ fontSize: 12, opacity: 0.8 }}>Your Fitness Expert</div>
          </div>
        </div>
        <button
          onClick={onClose}
          aria-label="Close chat"
          style={{
            background: 'transparent',
            border: 'none',
            color: '#fff',
            cursor: 'pointer',
            fontSize: 22,
            lineHeight: 1,
          }}
        >
          ×
        </button>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, padding: '14px 16px', overflowY: 'auto', background: '#fafafa' }}>
        <div
          style={{
            background: '#fff',
            borderRadius: 12,
            padding: '12px 14px',
            boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
            maxWidth: '90%',
            fontSize: '14px',
          }}
        >
          <div>Hey 👋 I am your Fitness Expert 😊 💪.</div>
          <div>You can ask me anything in any language</div>
        </div>
      </div>

      {/* Quick suggestions at the bottom */}
      <div style={{
        padding: '8px 16px 0 16px',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        background: '#fafafa',
      }}>
        {[
          'Suggest me whey protein!',
          'Do you have mass gainers?',
          'Difference between Pro Conc & Isorich whey?'
        ].map((t, i) => (
          <button
            key={i}
            style={{
              background: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: 999,
              padding: '8px 12px',
              textAlign: 'left',
              boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
              alignSelf: 'flex-end',
              fontSize: '14px',
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Input */}
      <div style={{ padding: 12, borderTop: '1px solid #eee', background: '#fff' }}>
        <input
          type="text"
          placeholder="Ask me anything"
          style={{
            width: '100%',
            padding: '12px 14px',
            borderRadius: 12,
            border: '1px solid #e5e7eb',
            outline: 'none',
            fontSize: 14,
          }}
        />
        <div style={{ textAlign: 'center', marginTop: 8, fontSize: 11, color: '#9ca3af' }}>
          Powered by <strong>Verifast</strong>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPanel;
