import express from "express";
import {
  getProduct,
  getVendor,
  getCategory,
  getSales,
  getPurchase,
} from "../../controllers/controllers.js";

const getContentRoute = express.Router();

getContentRoute.get("/products", getProduct);
getContentRoute.get("/vendors", getVendor);
getContentRoute.get("/category", getCategory);
getContentRoute.get("/sales", getSales);
getContentRoute.get("/purchase", getPurchase);

export default getContentRoute;
