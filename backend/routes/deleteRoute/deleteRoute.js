import express from "express";
import { deleteProduct } from "../../controllers/controllers.js";

const deleteRoute = express.Router();

deleteRoute.get("/product/:skuNo", deleteProduct);

export default deleteRoute;
