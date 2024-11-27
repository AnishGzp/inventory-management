import express from "express";
import { deleteProduct, deleteVendor } from "../../controllers/controllers.js";

const deleteRoute = express.Router();

deleteRoute.get("/product/:skuNo", deleteProduct);
deleteRoute.get("/vendor/:name", deleteVendor);

export default deleteRoute;