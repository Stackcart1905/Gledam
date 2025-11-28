import express from 'express';
import { createOrder, getUserOrders, getOrderById, verifyPayment } from "../controllers/order.controller.js";
import protectRoute from "../middleware/authmiddleware.js";

const router = express.Router();

// Create order from cart
router.post("/:userId/create", protectRoute, createOrder);

// Get user orders
router.get("/:userId", protectRoute, getUserOrders);

// Get order by ID
router.get("/order/:orderId", protectRoute, getOrderById);

// Verify Razorpay payment
router.post("/verify-payment", protectRoute, verifyPayment);

export default router;