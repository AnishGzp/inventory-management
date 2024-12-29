import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGO_URI;

async function connectToDatabase() {
  try {
    await mongoose.connect(uri);
    console.log("Connection to MongoDB Atlas successfully");
  } catch (err) {
    console.log("Database Connection Error:", err.message);
    throw new Error("Database connection failed");
  }
}

export default connectToDatabase;

//
// nHSFeu8JBMxUQMJq
