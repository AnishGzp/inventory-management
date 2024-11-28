import express from "express";
import {
  getProduct,
  getVendor,
  getCategory,
} from "../../controllers/controllers.js";

const getContentRoute = express.Router();

getContentRoute.get("/products", getProduct);
getContentRoute.get("/vendors", getVendor);
getContentRoute.get("/category", getCategory);

export default getContentRoute;
