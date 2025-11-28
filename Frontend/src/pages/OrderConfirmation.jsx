import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as orderApi from "@/lib/api/orders";

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        if (!orderId) {
          throw new Error("Order ID not provided");
        }
        
        const response = await orderApi.getOrderById(orderId);
        if (response.success) {
          setOrder(response.order);
        } else {
          throw new Error(response.message || "Failed to fetch order");
        }
      } catch (err) {
        console.error("Error fetching order:", err);
        setError(err.message || "Failed to load order details");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900 mt-25"></div>
          <p className="mt-2">Loading order details...</p>
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
            Go 
          </button>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Order Not Found</h2>
          <button 
            onClick={() => navigate("/")}
            className="bg-black text-white px-4 py-2 rounded"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8 mt-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Placed Successfully!</h1>
          <p className="text-gray-600">Thank you for your purchase. Your order has been received.</p>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
          <div className="px-6 py-4 border-b">
            <h2 className="text-xl font-bold">Order Details</h2>
            <p className="text-gray-600">Order #{order._id}</p>
          </div>
          
          <div className="px-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-lg mb-3">Shipping Address</h3>
                <div className="space-y-1">
                  <p>{order.shippingAddress.fullName}</p>
                  <p>{order.shippingAddress.address}</p>
                  <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
                  <p>{order.shippingAddress.country}</p>
                  <p>Phone: {order.shippingAddress.phone}</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-bold text-lg mb-3">Order Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹ {order.subtotal.toLocaleString()}</span>
                  </div>
                  {order.discount > 0 && (
                    <div className="flex justify-between">
                      <span>Discount</span>
                      <span className="text-green-600">- ₹ {order.discount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>₹ {order.total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Payment Method</span>
                    <span>{order.paymentMethod}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h2 className="text-xl font-bold">Items Ordered</h2>
          </div>
          
          <div className="divide-y">
            {order.items.map((item) => (
              <div key={item._id} className="px-6 py-4 flex items-center">
                <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center mr-4">
                  {item.product?.imageUrl ? (
                    <img 
                      src={item.product.imageUrl} 
                      alt={item.product.name} 
                      className="w-full h-full object-cover rounded"
                    />
                  ) : (
                    <span className="text-gray-500 text-xs">No Image</span>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{item.product?.name || "Product"}</h3>
                  <p className="text-gray-600 text-sm">Quantity: {item.quantity}</p>
                </div>
                <div className="font-medium">
                  ₹ {(item.price * item.quantity).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-8">
          <button 
            onClick={() => navigate("/")}
            className="bg-black text-white px-6 py-3 rounded-lg font-semibold mr-4 mb-6"
          >
            Continue Shopping
          </button>
          <button 
            onClick={() => navigate(`/order-details/${order._id}`)}
            className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold"
          >
            View Order Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;