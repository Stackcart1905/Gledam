import React, { useState, useEffect } from 'react';
import { CATEGORIES, addProduct, deleteProduct, getInventoryAnalytics, getProducts, updateProduct } from '@/lib/data/products';
import BlogManagement from '@/components/AdminDashboard/BlogManagement';

const Stat = ({ label, value }) => (
  <div className="bg-white/5 border border-white/10 rounded-xl p-4">
    <p className="text-xs uppercase tracking-wide text-gray-300">{label}</p>
    <p className="text-2xl font-bold text-white">{value}</p>
  </div>
);

const CategoryRow = ({ name, data }) => (
  <div className="flex items-center justify-between py-2 border-b border-white/10 last:border-none">
    <span className="text-gray-200">{name}</span>
    <div className="text-sm text-gray-300 flex gap-6">
      <span>Items: <b className="text-white">{data.count}</b></span>
      <span>Stock: <b className="text-white">{data.stock}</b></span>
      <span>Value: <b className="text-white">₹{data.value.toLocaleString()}</b></span>
    </div>
  </div>
);

const ProductRow = ({ p, onUpdate, onDelete }) => {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: p.name, price: p.price, stock: p.stock, status: p.status });

  const save = () => {
    const price = Number(form.price) || 0;
    const stock = Number(form.stock) || 0;
    onUpdate(p.id, { ...form, price, stock });
    setEditing(false);
  };

  return (
    <tr className="border-b border-white/10">
      <td className="p-2 text-gray-200">{p.id}</td>
      <td className="p-2">
        {editing ? (
          <input value={form.name} onChange={e=>setForm(f=>({ ...f, name: e.target.value }))} className="bg-black/40 border border-white/10 rounded px-2 py-1 w-full text-white" />
        ) : (
          <span className="text-white">{p.name}</span>
        )}
      </td>
      <td className="p-2 text-gray-300">{p.category}</td>
      <td className="p-2">
        {editing ? (
          <input type="number" value={form.price} onChange={e=>setForm(f=>({ ...f, price: e.target.value }))} className="bg-black/40 border border-white/10 rounded px-2 py-1 w-24 text-white" />
        ) : (
          <span className="text-gray-200">₹{p.price}</span>
        )}
      </td>
      <td className="p-2">
        {editing ? (
          <input type="number" value={form.stock} onChange={e=>setForm(f=>({ ...f, stock: e.target.value }))} className="bg-black/40 border border-white/10 rounded px-2 py-1 w-20 text-white" />
        ) : (
          <span className="text-gray-200">{p.stock}</span>
        )}
      </td>
      <td className="p-2">
        {editing ? (
          <select value={form.status} onChange={e=>setForm(f=>({ ...f, status: e.target.value }))} className="bg-black/40 border border-white/10 rounded px-2 py-1 text-white">
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        ) : (
          <span className={p.status === 'active' ? 'text-green-400' : 'text-yellow-400'}>
            {p.status}
          </span>
        )}
      </td>
      <td className="p-2 text-right">
        {editing ? (
          <div className="flex gap-2 justify-end">
            <button onClick={save} className="px-3 py-1 rounded bg-green-600 text-white text-sm">Save</button>
            <button onClick={()=>setEditing(false)} className="px-3 py-1 rounded bg-gray-600 text-white text-sm">Cancel</button>
          </div>
        ) : (
          <div className="flex gap-2 justify-end">
            <button onClick={()=>setEditing(true)} className="px-3 py-1 rounded bg-blue-600 text-white text-sm">Edit</button>
            <button onClick={()=>onDelete(p.id)} className="px-3 py-1 rounded bg-red-600 text-white text-sm">Delete</button>
          </div>
        )}
      </td>
    </tr>
  );
};

export default function AdminDashboard() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [products, setProducts] = useState([]);
  const [analytics, setAnalytics] = useState({
    totalProducts: 0,
    totalStock: 0,
    inventoryValue: 0,
    avgPrice: 0,
    byCategory: {},
    lowStock: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsData, analyticsData] = await Promise.all([
          getProducts(),
          getInventoryAnalytics()
        ]);
        setProducts(productsData);
        setAnalytics(analyticsData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, [refreshKey]);
  

  const [newItem, setNewItem] = useState({
    name: '',
    category: CATEGORIES[0],
    price: '',
    stock: '',
    imageUrl: '',
    status: 'active',
  });

  const addNew = (e) => {
    e.preventDefault();
    const price = Number(newItem.price) || 0;
    const stock = Number(newItem.stock) || 0;
    addProduct({ ...newItem, price, stock });
    setNewItem({ name: '', category: CATEGORIES[0], price: '', stock: '', imageUrl: '', status: 'active' });
    setRefreshKey(k=>k+1);
  };

  const onUpdate = (id, patch) => { updateProduct(id, patch); setRefreshKey(k=>k+1); };
  const onDelete = (id) => { deleteProduct(id); setRefreshKey(k=>k+1); };

  // No separate combos form — use category "Super Saver Combo" in product form

  return (
    <div className="bg-black min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-extrabold tracking-tight">Admin Dashboard</h1>
        <p className="text-gray-300 mt-1">Manage products by category and track inventory at a glance.</p>

        {/* Top stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <Stat label="Total Products" value={analytics.totalProducts} />
          <Stat label="Total Stock" value={analytics.totalStock} />
          <Stat label="Inventory Value" value={`₹${analytics.inventoryValue.toLocaleString()}`} />
          <Stat label="Avg. Price" value={`₹${Math.round(analytics.avgPrice).toLocaleString()}`} />
        </div>

        {/* Category breakdown */}
        <div className="mt-8 bg-white/5 border border-white/10 rounded-xl p-4">
          <h2 className="text-xl font-semibold mb-3">Category Overview</h2>
          {CATEGORIES.map(cat => (
            <CategoryRow key={cat} name={cat} data={analytics.byCategory[cat] || { count: 0, stock: 0, value: 0 }} />
          ))}
        </div>

        {/* Add product */}
        <div className="mt-8 bg-white/5 border border-white/10 rounded-xl p-4">
          <h2 className="text-xl font-semibold mb-3">Add New Product</h2>
          <form onSubmit={addNew} className="grid grid-cols-1 md:grid-cols-6 gap-3">
            <input required placeholder="Name" value={newItem.name} onChange={e=>setNewItem(v=>({ ...v, name: e.target.value }))} className="md:col-span-2 bg-black/40 border border-white/10 rounded px-3 py-2" />
            <select value={newItem.category} onChange={e=>setNewItem(v=>({ ...v, category: e.target.value }))} className="bg-black/40 border border-white/10 rounded px-3 py-2">
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <input required type="number" min="0" placeholder="Price (₹)" value={newItem.price} onChange={e=>setNewItem(v=>({ ...v, price: e.target.value }))} className="bg-black/40 border border-white/10 rounded px-3 py-2" />
            <input required type="number" min="0" placeholder="Stock" value={newItem.stock} onChange={e=>setNewItem(v=>({ ...v, stock: e.target.value }))} className="bg-black/40 border border-white/10 rounded px-3 py-2" />
            {/* Upload an image (stored as base64 data URL) */}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = () => {
                  setNewItem(v => ({ ...v, imageUrl: String(reader.result || '') }));
                };
                reader.readAsDataURL(file);
              }}
              className="bg-black/40 border border-white/10 rounded px-3 py-2 md:col-span-2"
            />
            <select value={newItem.status} onChange={e=>setNewItem(v=>({ ...v, status: e.target.value }))} className="bg-black/40 border border-white/10 rounded px-3 py-2">
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <div className="md:col-span-2">
              <button type="submit" className="px-4 py-2 bg-green-600 rounded text-white">Add Product</button>
            </div>
          </form>
          {newItem.imageUrl && (
            <div className="mt-3 text-sm text-gray-300">
              <div className="mb-1">Preview:</div>
              <div className="w-full max-w-sm border border-white/10 rounded overflow-hidden bg-black/30">
                <div className="aspect-[4/3] flex items-center justify-center">
                  <img src={newItem.imageUrl} alt="preview" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Blog Management */}
        <BlogManagement />

        {/* Product table */}
        <div className="mt-8 bg-white/5 border border-white/10 rounded-xl p-4 overflow-auto">
          <h2 className="text-xl font-semibold mb-3">All Products</h2>
          <table className="min-w-full text-sm">
            <thead className="text-left text-gray-300">
              <tr className="border-b border-white/10">
                <th className="p-2">ID</th>
                <th className="p-2">Name</th>
                <th className="p-2">Category</th>
                <th className="p-2">Price</th>
                <th className="p-2">Stock</th>
                <th className="p-2">Status</th>
                <th className="p-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <ProductRow key={p.id} p={p} onUpdate={onUpdate} onDelete={onDelete} />
              ))}
            </tbody>
          </table>
          {products.length === 0 && (
            <p className="text-gray-400 text-center py-6">No products yet. Use the form above to add your first product.</p>
          )}
        </div>

        {/* Low stock alert */}
        {analytics.lowStock?.length > 0 && (
          <div className="mt-8 bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
            <h2 className="text-xl font-semibold text-yellow-400 mb-2">Low Stock Alerts</h2>
            <ul className="list-disc list-inside text-gray-200">
              {analytics.lowStock.map(p => (
                <li key={p.id}>{p.name} — {p.stock} left</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
