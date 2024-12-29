import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema({
  product: { type: String, required: true },
  vendor: { type: String, required: true },
  quantity: { type: Number, required: true },
  selling_price: { type: Number, required: true },
  price: { type: Number, required: true },
  status: { type: String, required: true },
});

const Purchase = mongoose.model("Purchase", purchaseSchema);

export default Purchase;
