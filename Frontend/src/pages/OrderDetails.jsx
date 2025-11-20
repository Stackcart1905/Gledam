import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth/AuthContext";
import * as orderApi from "@/lib/api/orders";

const OrderDetails = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        if (!orderId) {
          throw new Error("Order ID not provided");
        }
        
        if (!user?._id) {
          throw new Error("User not authenticated");
        }
        
        const response = await orderApi.getOrderById(orderId);
        if (response.success) {
          // Verify that the order belongs to the current user
          if (response.order.user._id !== user._id && response.order.user !== user._id) {
            throw new Error("You don't have permission to view this order");
          }
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
  }, [orderId, user]);

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
            onClick={() => navigate("/my-orders")}
            className="mt-4 bg-black text-white px-4 py-2 rounded"
          >
            Back to Orders
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
            onClick={() => navigate("/my-orders")}
            className="bg-black text-white px-4 py-2 rounded"
          >
            Back to Orders
          </button>
        </div>
      </div>
    );
  }

  // Format order date
  const orderDate = new Date(order.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  // Calculate order status
  const getOrderStatus = () => {
    if (order.isDelivered) return "Delivered";
    if (order.isPaid) return "Paid";
    return "Order Comming Soon...";
  };

  const getStatusColor = () => {
    if (order.isDelivered) return "bg-green-100 text-green-800";
    if (order.isPaid) return "bg-blue-100 text-blue-800";
    return "bg-yellow-100 text-yellow-800";
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8 mt-4">
          <h1 className="text-3xl font-bold text-gray-900">Order Details</h1>
          <button 
            onClick={() => navigate("/my-orders")}
            className="text-gray-600 hover:text-gray-900 flex items-center"
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            Back to Orders
          </button>
        </div>

        {/* Order Summary Card */}
        <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
          <div className="px-6 py-4 border-b">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center">
              <div>
                <h2 className="text-xl font-bold">Order #{order._id}</h2>
                <p className="text-gray-600">Placed on {orderDate}</p>
              </div>
              <div className="mt-2 md:mt-0">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor()}`}>
                  {getOrderStatus()}
                </span>
              </div>
            </div>
          </div>
          
          <div className="px-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Shipping Address */}
              <div>
                <h3 className="font-bold text-lg mb-3">Shipping Address</h3>
                <div className="space-y-1 bg-gray-50 p-4 rounded-lg">
                  <p className="font-medium">{order.shippingAddress.fullName}</p>
                  <p>{order.shippingAddress.address}</p>
                  <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
                  <p>{order.shippingAddress.country}</p>
                  <p className="mt-2">Phone: {order.shippingAddress.phone}</p>
                </div>
              </div>
              
              {/* Payment & Order Summary */}
              <div>
                <h3 className="font-bold text-lg mb-3">Payment & Order Summary</h3>
                <div className="space-y-2 bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between">
                    <span>Payment Method</span>
                    <span className="font-medium">{order.paymentMethod}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹ {order.subtotal.toLocaleString()}</span>
                  </div>
                  {order.couponCode && (
                    <div className="flex justify-between">
                      <span>Coupon ({order.couponCode})</span>
                      <span className="text-green-600">- ₹ {order.discount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-lg pt-2 border-t">
                    <span>Total</span>
                    <span>₹ {order.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Items Ordered */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h2 className="text-xl font-bold">Items Ordered ({order.items.length})</h2>
          </div>
          
          <div className="divide-y">
            {order.items.map((item) => (
              <div key={item._id} className="px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center">
                <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center mr-4 mb-2 sm:mb-0">
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
                <div className="flex-1 w-full sm:w-auto">
                  <h3 className="font-medium">{item.product?.name || "Product"}</h3>
                  <p className="text-gray-600 text-sm">Quantity: {item.quantity}</p>
                </div>
                <div className="font-medium mt-2 sm:mt-0">
                  ₹ {(item.price * item.quantity).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="text-center mt-8">
          <button 
            onClick={() => navigate("/")}
            className="bg-black text-white px-6 py-3 mb-5 rounded-lg font-semibold mr-4"
          >
            Continue Shopping
          </button>
          <button 
            onClick={() => navigate("/my-orders")}
            className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold"
          >
            View All Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;