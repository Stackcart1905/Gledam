// src/components/common/ConnectionTest.jsx
import React, { useState, useEffect } from 'react';
import { checkBackendHealth } from '@/lib/api/health';

const ConnectionTest = () => {
  const [status, setStatus] = useState('checking...');
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const testConnection = async () => {
      try {
        const data = await checkBackendHealth();
        setStatus('connected');
        setDetails(data);
      } catch (error) {
        setStatus('disconnected');
        setDetails({
          error: error.message,
          timestamp: new Date().toISOString()
        });
      }
    };

    testConnection();
  }, []);

  return (
    <div className="p-4 bg-gray-800 text-white rounded-lg">
      <h3 className="font-bold mb-2">Backend Connection Status</h3>
      <p>Status: <span className={status === 'connected' ? 'text-green-400' : 'text-red-400'}>{status}</span></p>
      {details && (
        <div className="mt-2 text-sm">
          <p>Message: {details.message || details.error}</p>
          <p>Time: {details.timestamp}</p>
        </div>
      )}
    </div>
  );
};

export default ConnectionTest;