import React, { useMemo, useReducer, useEffect } from "react";
import { CartContext } from "./CartContextInstance";
import { useAuth } from "@/lib/auth/AuthContext";
import * as cartApi from "@/lib/api/cart";

const initialState = {
  items: [], // {id, name, price, qty, image, mrp, free}
  coupon: null,
  loading: false,
  error: null,
};

function cartReducer(state, action) {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.loading, error: action.loading ? null : state.error };
    case "SET_ERROR":
      return { ...state, loading: false, error: action.error };
    case "SET_ITEMS":
      return { ...state, items: action.items, loading: false, error: null };
    case "ADD_ITEM": {
      const { item } = action;
      const existing = state.items.find((i) => i.id === item.id);
      let items;
      if (existing) {
        items = state.items.map((i) => (i.id === item.id ? { ...i, qty: i.qty + (item.qty || 1) } : i));
      } else {
        items = [...state.items, { qty: 1, ...item }];
      }
      return { ...state, items };
    }
    case "REMOVE_ITEM": {
      const items = state.items.filter((i) => i.id !== action.id);
      return { ...state, items };
    }
    case "UPDATE_QTY": {
      const items = state.items.map((i) => (i.id === action.id ? { ...i, qty: Math.max(1, action.qty) } : i));
      return { ...state, items };
    }
    case "CLEAR":
      return { ...state, items: [] };
    case "APPLY_COUPON":
      return { ...state, coupon: action.code };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from backend when user logs in
  useEffect(() => {
    const loadCart = async () => {
      if (!user?._id) return;
      
      try {
        dispatch({ type: "SET_LOADING", loading: true });
        const cartData = await cartApi.getCart(user._id);
        
        // Transform backend cart data to frontend format
        const items = cartData.products.map(item => ({
          id: item.product._id,
          name: item.product.name,
          price: item.product.price,
          qty: item.quantity,
          image: item.product.imageUrl,
          mrp: item.product.price, // Assuming MRP is same as price for now
          free: false
        }));
        
        dispatch({ type: "SET_ITEMS", items });
      } catch (error) {
        console.error("Failed to load cart:", error);
        // Don't set error state for network issues to avoid blocking UI
        // Just continue with empty cart
        dispatch({ type: "SET_ITEMS", items: [] });
      }
    };
    
    loadCart();
  }, [user?._id]);

  const subtotal = useMemo(
    () => state.items.reduce((sum, i) => sum + (i.free ? 0 : (i.price || 0)) * (i.qty || 1), 0),
    [state.items]
  );
  const mrpTotal = useMemo(
    () => state.items.reduce((sum, i) => sum + (i.mrp || i.price || 0) * (i.qty || 1), 0),
    [state.items]
  );
  const discount = useMemo(
    () => {
      const productDiscount = Math.max(0, mrpTotal - subtotal);
      const couponDiscount = state.coupon ? 
        (state.coupon === "GST" ? Math.min(100, subtotal * 0.1) :
         state.coupon === "WELCOME" ? 200 :
         state.coupon === "SAVE50" ? 50 : 0) : 0;
      return productDiscount + couponDiscount;
    },
    [mrpTotal, subtotal, state.coupon]
  );
  const total = useMemo(
    () => Math.max(0, subtotal - (state.coupon ? 
      (state.coupon === "GST" ? Math.min(100, subtotal * 0.1) :
       state.coupon === "WELCOME" ? 200 :
       state.coupon === "SAVE50" ? 50 : 0) : 0)),
    [subtotal, state.coupon]
  );

  const addItem = async (item) => {
    dispatch({ type: "ADD_ITEM", item });
    
    // Save to backend if user is logged in
    if (user?._id) {
      try {
        await cartApi.addToCart(user._id, item.id, item.qty || 1);
      } catch (error) {
        console.error("Failed to add item to cart:", error);
        // Revert the local change if backend fails
        dispatch({ type: "REMOVE_ITEM", id: item.id });
      }
    }
  };

  const removeItem = async (id) => {
    dispatch({ type: "REMOVE_ITEM", id });
    
    // Save to backend if user is logged in
    if (user?._id) {
      try {
        await cartApi.removeFromCart(user._id, id);
      } catch (error) {
        console.error("Failed to remove item from cart:", error);
        // Note: We don't revert here as the item is already removed locally
      }
    }
  };

  const updateQty = async (id, qty) => {
    dispatch({ type: "UPDATE_QTY", id, qty });
    
    // Save to backend if user is logged in
    if (user?._id) {
      try {
        await cartApi.updateCartItem(user._id, id, qty);
      } catch (error) {
        console.error("Failed to update cart item:", error);
        // Revert to previous quantity if backend fails
        dispatch({ type: "UPDATE_QTY", id, qty: state.items.find(i => i.id === id)?.qty || 1 });
      }
    }
  };

  const clear = async () => {
    dispatch({ type: "CLEAR" });
    
    // Save to backend if user is logged in
    if (user?._id) {
      try {
        await cartApi.clearCart(user._id);
      } catch (error) {
        console.error("Failed to clear cart:", error);
        // Revert to previous items if backend fails
        dispatch({ type: "SET_ITEMS", items: state.items });
      }
    }
  };

  const applyCoupon = async (code) => {
    // Validate coupon code first
    let discountAmount = 0;
    if (code === "GST") {
      discountAmount = Math.min(100, subtotal * 0.1); // 10% discount up to ₹100
    } else if (code === "WELCOME") {
      discountAmount = 200; // Fixed ₹200 discount
    } else if (code === "SAVE50") {
      discountAmount = 50; // Fixed ₹50 discount
    }
    
    if (discountAmount <= 0) {
      throw new Error("Invalid coupon code");
    }
    
    dispatch({ type: "APPLY_COUPON", code });
    
    // Save to backend if user is logged in
    if (user?._id) {
      try {
        await cartApi.applyCoupon(user._id, code, discountAmount);
      } catch (error) {
        console.error("Failed to apply coupon:", error);
        // Revert the local change if backend fails
        dispatch({ type: "APPLY_COUPON", code: null });
        throw error;
      }
    }
  };

  const value = {
    items: state.items,
    coupon: state.coupon,
    subtotal,
    discount,
    total,
    loading: state.loading,
    error: state.error,
    addItem,
    removeItem,
    updateQty,
    clear,
    applyCoupon,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}