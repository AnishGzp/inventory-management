import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectToDatabase from "./db.js";
import { authRoute } from "./routes/routes.js";

dotenv.config();

const app = express();

// MiddleWares
app.use(cors());
app.use(express.json());
app.use("/auth", authRoute);

const PORT = process.env.PORT || 4000;

async function startServer() {
  try {
    const dbConnection = await connectToDatabase();

    app.locals.db = dbConnection; // This makes db accessible to routes without importing it

    app.listen(PORT, () => {
      console.log(`The server is listening on ${PORT}`);
    });
  } catch (err) {
    console.log("Database Connection failed", err);
  }
}

startServer();
