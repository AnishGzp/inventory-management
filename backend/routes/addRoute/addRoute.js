import express from "express";
import { addProduct } from "../../controllers/controllers.js";

const addRoute = express.Router();

addRoute.post("/products", addProduct);

export default addRoute;
