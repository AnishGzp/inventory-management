import express from "express";
import { newUser } from "../../controllers/controllers.js";

const authRoute = express.Router();

authRoute.post("/newUser", newUser);

export default authRoute;
