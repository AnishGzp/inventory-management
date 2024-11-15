import connectToDatabase from "../../db";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const secret = process.env.JWT_SECRET_KEY;
