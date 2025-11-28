// import mongoose from "mongoose";

// const orderItemSchema = new mongoose.Schema({
//   product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
//   quantity: { type: Number, required: true, min: 1 },
//   price: { type: Number, required: true },
// });

// const orderSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   items: [orderItemSchema],
//   subtotal: { type: Number, required: true },
//   status: { type: String, enum: ["placed", "paid", "shipped", "delivered", "cancelled"], default: "placed" },
//   address: { type: Object },
//   paymentInfo: { type: Object },
// }, { timestamps: true });

// const Order = mongoose.model("Order", orderSchema);

// export default Order;


