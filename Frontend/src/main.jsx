// import { StrictMode } from 'react'
// import { BrowserRouter } from 'react-router-dom'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import { CartProvider } from './lib/cart/CartContext.jsx'
// import { AuthProvider } from './lib/auth/AuthContext.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <BrowserRouter>
//       <AuthProvider>
//         <CartProvider>
//           <App />
//         </CartProvider>
//       </AuthProvider>
//     </BrowserRouter>
//   </StrictMode>,
// )

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./lib/auth/AuthContext";
import './index.css';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

