import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/useCart";

const CartDrawer = ({ open, onClose }) => {
  const navigate = useNavigate();
  const { items, coupon, subtotal, discount, total, removeItem, updateQty, applyCoupon } = useCart();
  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const THRESHOLD = 899;
  const progressPercent = Math.min(100, Math.round((total / THRESHOLD) * 100));
  const reached = total >= THRESHOLD;

  const handleCheckout = async () => {
    // This function should be implemented to handle the checkout process
    // For now, we'll just close the cart and navigate to the checkout page
    onClose();
    navigate('/checkout');
  };

  return (
  <div className={`fixed inset-0 z-50 ${open ? '' : 'pointer-events-none'}`} aria-hidden={!open}>
      {/* Overlay */}
      <div
        className={`absolute inset-0 bg-black/50 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <aside
        className={`absolute top-0 right-0 h-full bg-white text-black shadow-2xl flex flex-col transform transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ width: '30vw', minWidth: '320px', maxWidth: '520px', borderTopLeftRadius: '16px', borderBottomLeftRadius: '16px' }}
      >
        {/* Header gradient bar */}
        <div className="relative">
          <div className="h-16 bg-gradient-to-b from-sky-500 to-indigo-400 rounded-tl-2xl px-4 flex items-center justify-between">
            <h2 className="text-white text-2xl font-extrabold">My Cart</h2>
            <button onClick={onClose} className="bg-white/80 text-black font-semibold px-3 py-1 rounded-full">× Close</button>
          </div>

          {/* Promo strip */}
          <div className="bg-black text-white text-sm px-4 py-2 rounded-lg mx-3 -mt-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span>🕺 Use Code: <b>GST</b> & Unlock 10% GST Discount🕺</span>
              <span>🎁 Free Gift on Every Order Above <b>₹899</b> 🎁 ⏳ Limited Time Deal! ✨</span>
            </div>
          </div>

          {/* Progress + congratulation (dynamic) */}
          <div className="mx-3 mt-3 bg-white rounded-lg border">
            <div className="text-center text-gray-700 text-sm py-3">
              {reached ? (
                <span>Congratulations! You have unlocked Free Gift!</span>
              ) : (
                <span>
                  Add <b>₹{(THRESHOLD - total).toLocaleString()}</b> more to unlock your Free Gift
                </span>
              )}
            </div>
            <div className="px-4 pb-3">
              <div className="h-2 bg-gray-200 rounded-full relative overflow-hidden">
                <div
                  className="h-full bg-black rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
                <div
                  className={`absolute -top-2 bg-white rounded-full h-6 w-6 border border-black flex items-center justify-center transition-all duration-500 ${
                    reached ? 'right-0 translate-x-1/2' : ''
                  }`}
                  style={{ left: reached ? undefined : `calc(${progressPercent}% - 12px)` }}
                >
                  {reached ? '✔' : ''}
                </div>
              </div>
              <div className="text-right text-xs text-gray-600 mt-1 pr-1">{reached ? 'Free Gift!' : ''}</div>
            </div>
          </div>
        </div>

        {/* Items list */}
        <div className="flex-1 overflow-auto mt-3 px-3 space-y-2.5">
          {items.length === 0 && (
            <div className="text-center text-gray-500 py-10">Your cart is empty.</div>
          )}
          {items.map((it) => (
            <div key={it.id} className="bg-white rounded-xl border p-2 flex gap-2 items-center">
              <div className="h-14 w-14 rounded-lg border flex items-center justify-center overflow-hidden">
                {it.image ? (
                  <img src={it.image} alt={it.name} className="h-full w-full object-cover" />
                ) : (
                  <div className="h-12 w-12 bg-gray-200 rounded" />
                )}
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold line-clamp-2">{it.name}</div>
                <div className="flex items-center gap-2 text-sm mt-0.5">
                  {it.mrp && it.mrp > (it.price || 0) && (
                    <span className="text-gray-500 line-through">₹ {it.mrp}</span>
                  )}
                  {!it.free && (
                    <span className="font-semibold">₹ {(it.price || 0) * (it.qty || 1)}</span>
                  )}
                  {it.free && <span className="bg-gray-100 rounded-full px-2 py-0.5 text-xs font-semibold">Free</span>}
                </div>
                <div className="flex items-center gap-2 mt-1.5">
                  <button
                    aria-label="Decrease quantity"
                    className="h-7 w-7 flex items-center justify-center rounded border border-black bg-white text-black leading-none hover:bg-black hover:text-white transition-colors"
                    onClick={() => updateQty(it.id, (it.qty || 1) - 1)}
                  >
                    -
                  </button>
                  <span className="min-w-6 text-center text-sm">{it.qty || 1}</span>
                  <button
                    aria-label="Increase quantity"
                    className="h-7 w-7 flex items-center justify-center rounded border border-black bg-white text-black leading-none hover:bg-black hover:text-white transition-colors"
                    onClick={() => updateQty(it.id, (it.qty || 1) + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
              <button className="text-gray-500" onClick={() => removeItem(it.id)}>×</button>
            </div>
          ))}
        </div>

        {/* Discount and totals */}
        <div className="px-3 pt-3 space-y-3">
          <div className="flex gap-2">
            <input id="couponInput" className="flex-1 border rounded-lg px-3 py-3" placeholder="Apply Discount Code" />
            <button className="bg-black text-white px-4 rounded-lg font-semibold" onClick={() => {
              const el = document.getElementById('couponInput');
              if (el?.value) applyCoupon(el.value);
            }}>Apply</button>
          </div>
          {coupon && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-sm">
              <div className="flex justify-between">
                <span>Coupon Applied:</span>
                <span className="font-bold">{coupon}</span>
              </div>
            </div>
          )}
          <div className="bg-white rounded-xl border p-3 text-sm">
            <div className="flex justify-between py-1"><span>Subtotal</span><span>₹ {subtotal.toLocaleString()}</span></div>
            <div className="flex justify-between py-1"><span>Discount</span><span className="text-green-600">- ₹ {discount.toLocaleString()}</span></div>
            <div className="flex justify-between py-2 text-lg font-bold"><span>Total</span><span>₹ {total.toLocaleString()}</span></div>
          </div>
          <div className="text-sm text-gray-700 px-1">Earn <b>28</b></div>
          <button 
            className="w-full bg-black text-white rounded-lg py-4 text-lg font-bold"
            onClick={handleCheckout}
          >
            Checkout
          </button>
          <div className="h-3" />
        </div>
      </aside>
    </div>
  );
};

export default CartDrawer;
