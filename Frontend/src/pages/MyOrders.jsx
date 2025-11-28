import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth/AuthContext";
import * as orderApi from "@/lib/api/orders";
import { IoIosArrowRoundBack } from "react-icons/io";

const MyOrders = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (!user?._id) {
          throw new Error("User not authenticated");
        }
        
        const response = await orderApi.getUserOrders(user._id);
        if (response.success) {
          setOrders(response.orders);
        } else {
          throw new Error(response.message || "Failed to fetch orders");
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError(err.message || "Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900 mt-25"></div>
          <p className="mt-2">Loading your orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-8">
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

  return (
    <div className="container mx-auto px-4 py-8">
      
          <div className="flex items-center gap-[20px] mb-6 mt-4 ">
          <div
            onClick={() => {
              navigate("/");
            }}
          >
            <IoIosArrowRoundBack size={45} className="text-[#0f0e0e]" />
          </div>
          <h1 className="text-2xl font-bold">My Orders</h1>
        </div>

      {/* <h1 className="text-3xl font-bold mb-8 mt-4">My Orders</h1> */}
      
      {orders.length === 0 ? (
        // ! No orders message
        <div className="text-center py-12">
          <p className="text-gray-600 mb-6">You haven't placed any orders yet.</p>
          <button 
            onClick={() => navigate("/")}
            className="bg-black text-white px-6 py-3 rounded-lg font-semibold"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        // ! orderId and Date and Total and Items
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-6 py-4 border-b flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-bold">Order #{order._id}</h2>
                  <p className="text-gray-600 text-sm">
                    Placed on {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold">₹ {order.total.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">{order.items.length} items</p>
                </div>
              </div>
              
              {/* //! Order Images and View Details */}
              <div className="px-6 py-4 ">
                <div className="flex flex-wrap gap-4 mb-4">
                  {order.items.slice(0, 3).map((item) => (
                    <div key={item._id} className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center">
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
                  ))}
                  {order.items.length > 3 && (
                    <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center">
                      <span className="text-gray-500 text-xs">+{order.items.length - 3}</span>
                    </div>
                  )}
                </div>
                
                {/* //! Order Name and Address and View Details Button */}
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{order.shippingAddress.fullName}</p>
                    <p className="text-gray-600 text-sm">
                      {order.shippingAddress.city}, {order.shippingAddress.state}
                    </p>
                  </div>
                  
                  <button 
                    onClick={() => navigate(`/order-details/${order._id}`)}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    View Details
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

export default MyOrders;