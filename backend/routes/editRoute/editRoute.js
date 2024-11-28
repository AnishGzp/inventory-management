import express from "express";
import {
  editCategory,
  editProduct,
  editVendor,
} from "../../controllers/controllers.js";

const editRoute = express.Router();

//Edit products
editRoute.post("/products/:skuNo", editProduct);
editRoute.post("/vendor/:name", editVendor);
editRoute.post("/category/:name", editCategory);

export default editRoute;
