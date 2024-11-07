import express from "express";
import { newUser, getUser } from "../../controllers/controllers.js";

const authRoute = express.Router();

authRoute.post("/newUser", newUser);

authRoute.post("/getUser", getUser);

export default authRoute;
