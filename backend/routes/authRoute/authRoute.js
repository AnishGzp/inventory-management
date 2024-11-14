import express from "express";
import { newUser, getUser, getEmail } from "../../controllers/controllers.js";

const authRoute = express.Router();

authRoute.post("/newUser", newUser);

authRoute.post("/getUser", getUser);

authRoute.get("/getEmail", getEmail);

export default authRoute;
