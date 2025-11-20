import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/useCart";
import { useAuth } from "@/lib/auth/AuthContext";
import * as orderApi from "@/lib/api/orders";
import axios from "axios";

const Checkout = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { items, subtotal, discount, total, clear } = useCart();
  
  const [shippingAddress, setShippingAddress] = useState({
    fullName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "India",
    phone: ""
  });
  
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Function for opening Razorpay window
  const openRazorpayWindow = (orderId, razorOrder) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: razorOrder.amount,
      currency: "INR",
      name: "Gledam Shop",
      description: "Supplement Purchase",
      order_id: razorOrder.id,
      theme: {
        color: "#ef4444", // Brand theme color
      },
      handler: async function (response) {
        try {
          await axios.post(
            `${import.meta.env.VITE_API_BASE}/api/orders/verify-payment`,
            {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              orderId,
            },
            { withCredentials: true }
          );
          
          // Clear cart and navigate to order confirmation
          clear();
          navigate(`/order-confirmation/${orderId}`);
        } catch (error) {
          console.log(error);
          setError("Payment verification failed");
        }
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      // Validate form
      if (!shippingAddress.fullName || !shippingAddress.address || 
          !shippingAddress.city || !shippingAddress.state || 
          !shippingAddress.zipCode || !shippingAddress.phone) {
        throw new Error("Please fill all required fields");
      }
      
      if (!user?._id) {
        throw new Error("User not authenticated");
      }
      
      // Create order
      const orderData = {
        shippingAddress,
        paymentMethod
      };
      
      const response = await orderApi.createOrder(user._id, orderData);
      
      if (response.success) {
        // Check payment method
        if (paymentMethod === "COD") {
          // Clear cart after successful order
          clear();
          // Redirect to order confirmation page
          navigate(`/order-confirmation/${response.order._id}`);
        } else {
          // For online payment, open Razorpay window
          const orderId = response.order._id;
          const razorOrder = response.razorOrder;
          openRazorpayWindow(orderId, razorOrder);
        }
      } else {
        throw new Error(response.message || "Failed to create order");
      }
    } catch (err) {
      console.error("Checkout error:", err);
      setError(err.message || "An error occurred during checkout");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto  py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 mt-5">Your cart is empty</h2>
          <button 
            onClick={() => navigate("/")}
            className="bg-black text-white px-6 py-3 rounded-lg font-semibold"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 ">
      <h1 className="text-3xl font-bold mb-8 mt-5">Checkout</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Shipping Address Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={shippingAddress.fullName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={shippingAddress.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address *
                  </label>
                  <textarea
                    name="address"
                    value={shippingAddress.address}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={shippingAddress.city}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State *
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={shippingAddress.state}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ZIP Code *
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    value={shippingAddress.zipCode}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Country
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={shippingAddress.country}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                  />
                </div>
              </div>
            </div>
            
            {/* Payment Method */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4">Payment Method</h2>
              
              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="COD"
                    checked={paymentMethod === "COD"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-2"
                  />
                  <span>Cash on Delivery</span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Online"
                    checked={paymentMethod === "Online"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-2"
                  />
                  <span>Credit/Debit Card/UPI (Online Payment)</span>
                </label>
                
               
              </div>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-3 px-4 mb-4 rounded-lg font-bold text-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
            >
              {loading ? "Processing..." : "Place Order"}
            </button>
          </form>
        </div>
        
        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow p-6 h-fit">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          
          <div className="space-y-3 mb-4">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between">
                <div>
                  <span className="font-medium">{item.name}</span>
                  <span className="text-gray-600 ml-2">x {item.qty}</span>
                </div>
                <span>₹ {(item.price * item.qty).toLocaleString()}</span>
              </div>
            ))}
          </div>
          
          <div className="border-t pt-3 space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹ {subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Discount</span>
              <span className="text-green-600">- ₹ {discount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>₹ {total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;