import express from "express";
import {
  addCategory,
  addProduct,
  addSales,
  addVendor,
} from "../../controllers/controllers.js";

const addRoute = express.Router();

addRoute.post("/products", addProduct);
addRoute.post("/vendors", addVendor);
addRoute.post("/category", addCategory);
addRoute.post("/sales", addSales);

export default addRoute;
