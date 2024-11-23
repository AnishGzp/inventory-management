import express from "express";
import { editProduct } from "../../controllers/controllers.js";

const editRoute = express.Router();

//Edit products
editRoute.post("/product/:skuNo", editProduct);

export default editRoute;
