import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { authRoute } from "./routes/routes.js";

dotenv.config();

const app = express();

// MiddleWares
app.use(cors());
app.use(express.json());
app.use("/auth", authRoute);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
