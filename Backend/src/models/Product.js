import mongoose from 'mongoose';


const ProductSchema = new mongoose.Schema({
name: { type: String, required: true },
category: { type: String, required: true },
price: { type: Number, default: 0 },
stock: { type: Number, default: 0 },
imageUrl: { type: String }, // store base64 or URL
status: { type: String, enum: ['active', 'inactive'], default: 'active' },
createdAt: { type: Date, default: Date.now }
});


export default mongoose.model('Product', ProductSchema);