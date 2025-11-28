import Order from "../models/Order.js";
import Cart from "../models/cartSchema.model.js";
import Razorpay from "razorpay";

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create order from cart
export const createOrder = async (req, res) => {
  try {
    const { userId } = req.params;
    const { shippingAddress, paymentMethod } = req.body;

    // Get user's cart
    const cart = await Cart.findOne({ user: userId }).populate("products.product");
    
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found"
      });
    }

    if (cart.products.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty"
      });
    }

    // Create order items from cart products
    const orderItems = cart.products.map(item => ({
      product: item.product._id,
      quantity: item.quantity,
      price: item.product.price
    }));

    // Calculate prices
    const subtotal = orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const discount = cart.discountAmount || 0;
    const total = subtotal - discount;

    // Create order
    const order = new Order({
      user: userId,
      items: orderItems,
      subtotal,
      discount,
      couponCode: cart.couponCode,
      total,
      shippingAddress,
      paymentMethod
    });

    const createdOrder = await order.save();

    // If payment method is online, create Razorpay order
    if (paymentMethod !== "COD") {
      const razorOrder = await razorpay.orders.create({
        amount: total * 100, // Razorpay expects amount in paise
        currency: "INR",
        receipt: `order_${createdOrder._id}`,
        notes: {
          orderId: createdOrder._id.toString()
        }
      });

      // Update order with Razorpay order ID
      createdOrder.razorpayOrderId = razorOrder.id;
      await createdOrder.save();

      return res.status(201).json({
        success: true,
        message: "Order created successfully",
        order: createdOrder,
        razorOrder
      });
    }

    // Clear the cart after order creation (only for COD)
    if (paymentMethod === "COD") {
      cart.products = [];
      cart.couponCode = null;
      cart.discountAmount = 0;
      await cart.save();
    }

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order: createdOrder
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};

// Get user orders
export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;
    
    const orders = await Order.find({ user: userId })
      .populate("items.product")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      orders
    });
  } catch (error) {
    console.error("Error getting user orders:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};

// Get order by ID
export const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;
    
    const order = await Order.findById(orderId)
      .populate("user", "fullName email")
      .populate("items.product");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    res.status(200).json({
      success: true,
      order
    });
  } catch (error) {
    console.error("Error getting order:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};

// Verify Razorpay payment
export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature, orderId } = req.body;

    // Verify payment signature
    const crypto = await import('crypto');
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed"
      });
    }

    // Update order with payment details
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    order.paymentStatus = "paid";
    order.razorpayPaymentId = razorpay_payment_id;
    order.razorpaySignature = razorpay_signature;
    await order.save();

    // Clear the cart
    const cart = await Cart.findOne({ user: order.user });
    if (cart) {
      cart.products = [];
      cart.couponCode = null;
      cart.discountAmount = 0;
      await cart.save();
    }

    res.status(200).json({
      success: true,
      message: "Payment verified successfully",
      order
    });
  } catch (error) {
    console.error("Error verifying payment:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};