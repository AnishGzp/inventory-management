import express from "express";
import { addProduct, addVendor } from "../../controllers/controllers.js";

const addRoute = express.Router();

addRoute.post("/products", addProduct);
addRoute.post("/vendors", addVendor);

export default addRoute;
