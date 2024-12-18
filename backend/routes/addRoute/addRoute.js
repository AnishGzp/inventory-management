import express from "express";
import {
  addCategory,
  addProduct,
  addPurchase,
  addSales,
  addVendor,
} from "../../controllers/controllers.js";

const addRoute = express.Router();

addRoute.post("/products", addProduct);
addRoute.post("/vendors", addVendor);
addRoute.post("/category", addCategory);
addRoute.post("/sales", addSales);
addRoute.post("/purchase", addPurchase);

export default addRoute;
