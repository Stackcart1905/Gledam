import React, { useState, useRef, useEffect } from 'react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your Gledam Fitness Assistant.\n\nI can help you with:\n• Fitness and nutrition questions\n• Product recommendations\n• Supplement advice\n\nWhat are you looking for today?",
      sender: 'bot',
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = async (messageToSend = null) => {
    const messageText = messageToSend || inputValue;
    if (messageText.trim() === '' || isLoading) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      text: messageText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Send message to backend API
      const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5001';
      const response = await fetch(`${API_BASE}/api/chatbot`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: messageText }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response from chatbot');
      }

      const data = await response.json();
      
      // Add bot response
      const botMessage = {
        id: Date.now() + 1,
        text: data.response,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Chatbot error:', error);
      
      // Add error message
      const errorMessage = {
        id: Date.now() + 1,
        text: "Sorry, I'm having trouble connecting. Please try again later.",
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickQuestion = (question) => {
    handleSend(question);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-full max-w-md h-[500px] bg-white rounded-lg shadow-xl z-50 flex flex-col border border-gray-200">
          <div className="bg-gray-800 text-white p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="font-semibold">Gledam Fitness Assistant</h3>
            <button 
              onClick={toggleChat}
              className="text-gray-300 hover:text-white cursor-pointer"
            >
              ✕
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  <div className="text-sm whitespace-pre-wrap">{message.text}</div>
                  <p className="text-xs mt-1 opacity-70">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start mb-4">
                <div className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Quick action buttons for common questions */}
          {messages.length === 1 && (
            <div className="px-4 py-3 bg-gray-100 border-t border-gray-200">
              <p className="text-xs text-gray-500 mb-2">Try asking about:</p>
              <div className="flex flex-wrap gap-2">
                <button 
                  onClick={() => handleQuickQuestion("Do you have mass gainer?")}
                  className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                >
                  Mass Gainer
                </button>
                <button 
                  onClick={() => handleQuickQuestion("What protein powder do you recommend?")}
                  className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                >
                  Protein
                </button>
                <button 
                  onClick={() => handleQuickQuestion("Best creatine for muscle building?")}
                  className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                >
                  Creatine
                </button>
                <button 
                  onClick={() => handleQuickQuestion("BCAA supplements for recovery?")}
                  className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                >
                  BCAA
                </button>
              </div>
            </div>
          )}
          
          <div className="border-t border-gray-200 p-4">
            <div className="flex">
              <textarea
                value={inputValue}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="Ask about fitness, supplements, or products..."
                className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none resize-none"
                rows="2"
                disabled={isLoading}
              />
              <button
                onClick={() => handleSend()}
                disabled={isLoading || inputValue.trim() === ''}
                className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
      
      <button
       style={{
        position: 'fixed',
        right: '1rem',
        bottom: '1rem',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #222 60%, #4f8cff 100%)',
        borderRadius: '50%',
        width: '64px',
        height: '64px',
        boxShadow: '0 6px 24px rgba(0,0,0,0.18)',
        border: 'none',
        transition: 'box-shadow 0.2s, transform 0.1s',
        cursor: 'pointer',
      }}
        onClick={toggleChat}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50 animate-bounce hover:animate-none text-white "
      >
        {isOpen ? '✕' : 
        <div>
         <svg width="34" height="34" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
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
          left: '48px',
          bottom: '10px',
          width: '13px',
          height: '13px',
          background: 'radial-gradient(circle at 60% 40%, #25D366 80%, #1fa855 100%)',
          borderRadius: '50%',
          border: '2px solid #fff',
          boxShadow: '0 0 8px #25D366',
        }}
      />
        </div> 
        }
      </button>
    </>
  );
};

export default Chatbot;