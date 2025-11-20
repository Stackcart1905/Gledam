import React, { useState, useEffect } from 'react';
import * as productApi from '@/lib/api/products';
import { getProducts } from '@/lib/data/products';

const TestProducts = () => {
  const [apiProducts, setApiProducts] = useState([]);
  const [processedProducts, setProcessedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        console.log('Fetching products from API...');
        
        // Test raw API call
        const apiResponse = await productApi.fetchProducts();
        console.log('Raw API response:', apiResponse);
        setApiProducts(apiResponse);
        
        // Test processed products
        console.log('Fetching processed products...');
        const processedResponse = await getProducts();
        console.log('Processed products:', processedResponse);
        setProcessedProducts(processedResponse);
        
        setError(null);
      } catch (err) {
        console.error('Error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Product Fetch Test</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold">Raw API Response ({apiProducts.length} products):</h2>
        {apiProducts.length > 0 && (
          <div>
            <p>First product: {JSON.stringify(apiProducts[0], null, 2)}</p>
          </div>
        )}
      </div>
      
      <div>
        <h2 className="text-xl font-semibold">Processed Products ({processedProducts.length} products):</h2>
        {processedProducts.length > 0 && (
          <div>
            <p>First product: {JSON.stringify(processedProducts[0], null, 2)}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestProducts;