import mongoose from "mongoose";

const salesSchema = new mongoose.Schema({
  customer: { type: String, required: true },
  productName: { type: String, required: true },
  vandorName: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

const Sales = mongoose.model("Sales", salesSchema);

export default Sales;
