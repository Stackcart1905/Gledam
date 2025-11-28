import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsappFloatingButton = () => {
  return (
    <a
      href="https://wa.me/919999999999" // Replace with your WhatsApp number
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      style={{
        position: 'fixed',
        left: '2rem',
        bottom: '1rem',
        zIndex: 1000,
        background: '#25D366',
        borderRadius: '50%',
        width: '64px',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
        transition: 'box-shadow 0.2s',
      }}
    >
      <FaWhatsapp size={36} color="#fff" />
    </a>
  );
};

export default WhatsappFloatingButton;
