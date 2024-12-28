import express from "express";
import {
  deleteProduct,
  deleteVendor,
  deleteCategory,
  deleteSales,
  deletePurchase,
} from "../../controllers/controllers.js";

const deleteRoute = express.Router();

deleteRoute.get("/product/:skuNo", deleteProduct);
deleteRoute.get("/vendor/:name", deleteVendor);
deleteRoute.get("/category/:name", deleteCategory);
deleteRoute.get("/sales/:id", deleteSales);
deleteRoute.get("/purchase/:id", deletePurchase);

export default deleteRoute;
