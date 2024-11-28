import express from "express";
import {
  deleteProduct,
  deleteVendor,
  deleteCategory,
} from "../../controllers/controllers.js";

const deleteRoute = express.Router();

deleteRoute.get("/product/:skuNo", deleteProduct);
deleteRoute.get("/vendor/:name", deleteVendor);
deleteRoute.get("/category/:name", deleteCategory);

export default deleteRoute;
