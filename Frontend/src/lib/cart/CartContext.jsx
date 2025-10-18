import React, { createContext, useContext, useMemo, useReducer } from "react";
import { useAuth } from "@/lib/auth/AuthContext";

const CartContext = createContext(null);

const initialState = {
  items: [], // {id, name, price, qty, image, mrp, free}
  coupon: null,
};

function cartReducer(state, action) {
  switch (action.type) {
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
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const auth = (() => {
    try {
      // Hook can't be used outside component body in SSR, but in client it's fine.
      return useAuth();
    } catch {
      return { isLoggedIn: false };
    }
  })();

  const subtotal = useMemo(
    () => state.items.reduce((sum, i) => sum + (i.free ? 0 : (i.price || 0)) * (i.qty || 1), 0),
    [state.items]
  );
  const mrpTotal = useMemo(
    () => state.items.reduce((sum, i) => sum + (i.mrp || i.price || 0) * (i.qty || 1), 0),
    [state.items]
  );
  const discount = Math.max(0, mrpTotal - subtotal);
  const total = Math.max(0, subtotal);

  const value = useMemo(
    () => ({
      items: state.items,
      coupon: state.coupon,
      subtotal,
      discount,
      total,
      addItem: (item) => {
        if (!auth?.isLoggedIn) {
          if (typeof window !== 'undefined') window.alert('Please log in to add items to cart.');
          return;
        }
        dispatch({ type: "ADD_ITEM", item })
      },
      removeItem: (id) => dispatch({ type: "REMOVE_ITEM", id }),
      updateQty: (id, qty) => dispatch({ type: "UPDATE_QTY", id, qty }),
      clear: () => dispatch({ type: "CLEAR" }),
      applyCoupon: (code) => dispatch({ type: "APPLY_COUPON", code }),
    }),
    [state.items, state.coupon, subtotal, discount, total]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
