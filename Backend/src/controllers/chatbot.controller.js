import { GoogleGenerativeAI } from "@google/generative-ai";
import Product from '../models/Product.js';

// Access your API key as an environment variable
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Initialize the model
const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

// Project context for the chatbot
const projectContext = `
You are an AI assistant for Gledam, a fitness-focused e-commerce platform. Your role is to help users with fitness-related questions and recommend products from our database.

Key Responsibilities:
1. Answer fitness and nutrition questions
2. Recommend products based on user needs
3. Provide information about products in our database
4. Help users find the right supplements for their goals

Product Categories:
- Creatine
- Protein Powder
- Mass Gainer
- Multivitamins
- BCAA
- Omega
- Magnesium
- Peanut Butter
- Apparel & Accessories
- Super Saver Combo

When recommending products:
1. First, check our product database for relevant items
2. Provide specific product names, prices, and key features
3. Explain why a product might be suitable for their needs
4. Mention if a product is out of stock or low in stock

Always be friendly, helpful, and focused on the user's fitness goals.
`;

export const chatbotResponse = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // Check if the user is asking about specific products
    let productInfo = "";
    if (message.toLowerCase().includes('mass gainer') || 
        message.toLowerCase().includes('protein') || 
        message.toLowerCase().includes('creatine') ||
        message.toLowerCase().includes('bcaa') ||
        message.toLowerCase().includes('multivitamin') ||
        message.toLowerCase().includes('omega') ||
        message.toLowerCase().includes('magnesium') ||
        message.toLowerCase().includes('peanut butter')) {
      
      // Fetch relevant products from database
      const products = await Product.find({
        $or: [
          { category: { $regex: message, $options: 'i' } },
          { name: { $regex: message, $options: 'i' } },
          { tags: { $regex: message, $options: 'i' } }
        ]
      }).limit(5);
      
      if (products.length > 0) {
        productInfo = "\n\nHere are some products we have in our store that might interest you:\n";
        products.forEach((product, index) => {
          const stockStatus = product.stock > 10 ? 'In stock' : product.stock > 0 ? `Low in stock (${product.stock} items available)` : 'Out of stock';
          productInfo += `\n${index + 1}. **${product.name}**\n`;
          productInfo += `   * **Category:** ${product.category}\n`;
          productInfo += `   * **Price:** ₹${product.price}\n`;
          productInfo += `   * **Stock Status:** ${stockStatus}\n`;
        });
        productInfo += "\nYou can find more details about these products on our website!";
      } else {
        productInfo = "\n\nI couldn't find any products matching your request. Our inventory might be out of stock for this item. Would you like to know about other products we have available?";
      }
    }

    // Combine project context with user message and product info
    const prompt = `${projectContext}

User: ${message}

Product Information: ${productInfo}
Assistant: Provide a clear, well-formatted response with proper line breaks. Use bullet points where appropriate. Keep the response concise and easy to read. Format the response in a clean, readable way similar to ChatGPT with proper paragraph breaks and bullet points when listing items.`;

    // Generate response using Gemini
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ response: text });
  } catch (error) {
    console.error("Chatbot error:", error);
    res.status(500).json({ error: "Failed to generate response" });
  }
};