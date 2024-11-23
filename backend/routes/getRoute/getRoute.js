import express from "express";
import { getProduct } from "../../controllers/controllers.js";

const getContentRoute = express.Router();

getContentRoute.get("/products", getProduct);

export default getContentRoute;
