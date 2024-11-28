import express from "express";
import {
  addCategory,
  addProduct,
  addVendor,
} from "../../controllers/controllers.js";

const addRoute = express.Router();

addRoute.post("/products", addProduct);
addRoute.post("/vendors", addVendor);
addRoute.post("/category", addCategory);

export default addRoute;
