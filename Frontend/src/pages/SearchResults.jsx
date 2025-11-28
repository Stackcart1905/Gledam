import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as productApi from '@/lib/api/products';
import { useCart } from '@/context/useCart';

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addItem } = useCart();
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Extract search query from URL
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q') || '';

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        setLoading(true);
        setError('');
        
        // Fetch products based on search query using the product API service
        const data = await productApi.searchProducts(query);
        setProducts(data);
      } catch (err) {
        console.error('Error fetching search results:', err);
        setError('Failed to load search results. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchSearchResults();
    } else {
      setLoading(false);
    }
  }, [query]);

  const handleAddToCart = (product) => {
    addItem({
      id: product._id,
      name: product.name,
      price: product.price,
      qty: 1,
      image: product.imageUrl,
      mrp: product.price,
      free: false
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
          <p className="mt-2">Searching for "{query}"...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
          <button 
            onClick={() => navigate("/")}
            className="mt-4 bg-black text-white px-4 py-2 rounded"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Search Results for "{query}"
        </h1>
        <p className="text-gray-600 mt-2">
          {products.length} {products.length === 1 ? 'product' : 'products'} found
        </p>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-5xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No products found</h2>
          <p className="text-gray-600 mb-6">
            We couldn't find any products matching "{query}". Try searching for something else.
          </p>
          <button 
            onClick={() => navigate("/")}
            className="bg-black text-white px-6 py-3 rounded-lg font-semibold"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product._id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                {product.imageUrl ? (
                  <img 
                    src={product.imageUrl} 
                    alt={product.name} 
                    className="h-full w-full object-contain p-2"
                  />
                ) : (
                  <div className="text-gray-500">No Image</div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1 line-clamp-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{product.category}</p>
                <div className="flex justify-between items-center mt-3">
                  <span className="font-bold">₹{product.price}</span>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="bg-black text-white px-3 py-1 rounded text-sm hover:bg-gray-800 transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;