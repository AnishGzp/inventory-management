import express from "express";
import { addProduct } from "../../controllers/controllers.js";

const addContentRoute = express.Router();

addContentRoute.post("/products", addProduct);

export default addContentRoute;
