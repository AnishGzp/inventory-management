import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import {
  addRoute,
  authRoute,
  deleteRoute,
  editRoute,
  getRoute,
} from "./routes/routes.js";

dotenv.config();

const app = express();

// MiddleWares
app.use(cors());
app.use(express.json());
app.use("/auth", authRoute);
// Add contents routes
app.use("/add", addRoute);
// Get contents routes
app.use("/", getRoute);
// Edit contents routes
app.use("/edit", editRoute);
// Delete contents routes
app.use("/delete", deleteRoute);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
