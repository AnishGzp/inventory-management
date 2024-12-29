import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  skuNo: { type: String, required: true, unique: true },
  name: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  description: { type: String },
  quantity: { type: String, required: true },
  price: { type: String, required: true },
  vendor: { type: String, required: true },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
