import React, { useMemo, useRef, useState } from 'react';

const ChatbotPanel = ({ open, onClose }) => {
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Hey 👋 I am your Fitness Expert 😊 💪.' },
    { role: 'assistant', text: 'You can ask me anything in any language' },
  ]);
  const [input, setInput] = useState('');
  const listRef = useRef(null);

  const canSend = useMemo(() => input.trim().length > 0, [input]);

  const sendMessage = (text) => {
    const content = (text ?? input).trim();
    if (!content) return;
    setMessages((prev) => [
      ...prev,
      { role: 'user', text: content },
      // Placeholder bot response – replace with real API later
      { role: 'assistant', text: "Thanks! I'm here to help." },
    ]);
    setInput('');
    // Scroll to bottom after a tick
    setTimeout(() => {
      if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
    }, 0);
  };

  if (!open) return null;

  return (
    <div
      style={{
        position: 'fixed',
        left: '1rem',
        bottom: '1.5rem',
        top: '5rem',
        zIndex: 1100,
        width: 'min(380px, 92vw)',
        maxWidth: '92vw',
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
      <div ref={listRef} style={{ flex: 1, padding: '14px 16px', overflowY: 'auto', background: '#fafafa' }}>
        {messages.map((m, idx) => (
          <div
            key={idx}
            style={{
              display: 'flex',
              justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start',
              marginBottom: 10,
            }}
          >
            <div
              style={{
                background: m.role === 'user' ? '#111' : '#fff',
                color: m.role === 'user' ? '#fff' : '#111',
                borderRadius: 12,
                padding: '10px 12px',
                boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                maxWidth: '85%',
                fontSize: '14px',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
              }}
            >
              {m.text}
            </div>
          </div>
        ))}
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
            onClick={() => sendMessage(t)}
            style={{
              background: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: 999,
              padding: '8px 12px',
              textAlign: 'left',
              boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
              alignSelf: 'flex-end',
              fontSize: '14px',
              cursor: 'pointer',
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Input with send icon button */}
      <div style={{ padding: 12, borderTop: '1px solid #eee', background: '#fff' }}>
        <div style={{ position: 'relative' }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            placeholder="Ask me anything"
            style={{
              width: '100%',
              padding: '12px 80px 12px 14px', // space for the SEND button on right
              borderRadius: 12,
              border: '1px solid #e5e7eb',
              outline: 'none',
              fontSize: 14,
            }}
            aria-label="Message input"
          />
          <button
            onClick={() => sendMessage()}
            disabled={!canSend}
            aria-label="Send message"
            style={{
              position: 'absolute',
              right: 6,
              top: '50%',
              transform: 'translateY(-50%)',
              height: 34,
              minWidth: 64,
              padding: '0 12px',
              borderRadius: 8,
              border: '1px solid #e5e7eb',
              background: canSend ? '#111' : '#f3f4f6',
              color: canSend ? '#fff' : '#9ca3af',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              lineHeight: 0,
              cursor: canSend ? 'pointer' : 'not-allowed',
            }}
          >
            <span style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: 0.5,
              textTransform: 'uppercase'
            }}>Send</span>
          </button>
        </div>
        <div style={{ textAlign: 'center', marginTop: 8, fontSize: 11, color: '#9ca3af' }}>
          Powered by <strong>Verifast</strong>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPanel;
