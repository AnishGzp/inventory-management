import express from "express";
import { editProduct } from "../../controllers/controllers.js";

const editRoute = express.Router();

//Edit products
editRoute.post("/products/:skuNo", editProduct);

export default editRoute;
