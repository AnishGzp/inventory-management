import express from "express";
import { editProduct, editVendor } from "../../controllers/controllers.js";

const editRoute = express.Router();

//Edit products
editRoute.post("/products/:skuNo", editProduct);
editRoute.post("/vendor/:name", editVendor);

export default editRoute;
