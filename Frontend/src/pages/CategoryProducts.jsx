import React, { useState, useEffect } from 'react';
import { getProductsByCategory } from '@/lib/data/products';
import { useCart } from '@/context/useCart';

const ProductCard = ({ p, qtyOf, addItem }) => (
  <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
    <div className="aspect-[4/3] bg-black/50">
      {p.imageUrl ? (
        <img src={p.imageUrl} alt={p.name} className="w-full h-full object-contain" loading="lazy" />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">No image</div>
      )}
    </div>
    <div className="p-3">
      <h3 className="font-semibold text-white line-clamp-2 min-h-[2.5rem]">{p.name}</h3>
      <div className="mt-2 flex items-center justify-between text-sm">
        <span className="text-black">₹{p.price}</span>
        <span className="text-gray-600">Stock: {p.stock}</span>
      </div>
      <button
        className="mt-3 w-full py-2 rounded text-black text-sm disabled:opacity-50"
        style={{ backgroundColor: '#CCFF00' }}
        disabled={p.status !== 'active' || p.stock <= 0}
        onClick={() => addItem({ id: p.id, name: p.name, price: p.price, image: p.imageUrl })}
      >
        {p.status !== 'active' ? 'Unavailable' : p.stock <= 0 ? 'Out of stock' : (qtyOf(p.id) > 0 ? `${qtyOf(p.id)} added` : 'Add to cart')}
      </button>
    </div>
  </div>
);

export default function CategoryProducts({ category }) {
  const { addItem, items: cartItems } = useCart();
  const qtyOf = (id) => cartItems.find(i => i.id === id)?.qty || 0;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const productsData = await getProductsByCategory(category);
        setProducts(productsData);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  if (loading) {
    return (
      <div className="bg-white text-black min-h-[70vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="bg-white text-black min-h-[70vh]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">{category}</h1>
        <p className="text-gray-700 mt-1">Explore our curated {category.toLowerCase()} collection.</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
          {products.map(p => <ProductCard key={p.id} p={p} qtyOf={qtyOf} addItem={addItem} />)}
        </div>
        {products.length === 0 && (
          <p className="text-gray-500 mt-8">No items yet in this category. Try adding some from the Admin Dashboard.</p>
        )}
      </div>
    </div>
  );
}
