import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectDB } from './lib/db.js';
import authRoutes from "./routes/authRoute.js";
import blogRoutes from './routes/blogRoute.js';
import contactRoute from './routes/contactRoute.js';
import productRoute from "./routes/productRoutes.js";
import cartRoute from "./routes/cartRoute.js";
import reviewRoute from './routes/reviewRoute.js';
import userRoute from './routes/userRoute.js';
import orderRoute from './routes/orderRoute.js';
import chatbotRoute from './routes/chatbot.route.js';



const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use(cookieParser());

// CORS configuration
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173', 'http://localhost:5174', 'http://127.0.0.1:5174', 'http://localhost:5175', 'http://127.0.0.1:5175', 'http://localhost:5176', 'http://127.0.0.1:5176', 'http://localhost:5177', 'http://127.0.0.1:5177', 'http://localhost:5178', 'http://127.0.0.1:5178', 'http://localhost:5179', 'http://127.0.0.1:5179', 'http://localhost:5180', 'http://127.0.0.1:5180', 'http://localhost:5181', 'http://127.0.0.1:5181', 'http://localhost:5182', 'http://127.0.0.1:5182', 'http://localhost:5184', 'http://127.0.0.1:5184', 'http://localhost:5186', 'http://127.0.0.1:5186'],
  credentials: true,
  optionsSuccessStatus: 200
}));


app.use("/api/auth", authRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/contact", contactRoute);
app.use("/api/products", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/reviews", reviewRoute);
app.use("/api/users", userRoute);
app.use("/api/orders", orderRoute);
app.use("/api/chatbot", chatbotRoute);


// Test route
app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'Server is running!', timestamp: new Date().toISOString() });
});

// Test product data format
app.get('/api/test-products', async (req, res) => {
  try {
    const products = await import('./models/Product.js').then(module => module.default.find().limit(5));
    res.status(200).json({
      count: products.length,
      sample: products[0],
      keys: products[0] ? Object.keys(products[0].toObject()) : []
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});