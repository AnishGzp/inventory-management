import express from "express";
import { getProduct, getVendor } from "../../controllers/controllers.js";

const getContentRoute = express.Router();

getContentRoute.get("/products", getProduct);
getContentRoute.get("/vendors", getVendor);

export default getContentRoute;
