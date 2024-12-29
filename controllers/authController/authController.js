import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Auth from "../../models/auth.js"; // Importing the Auth model

dotenv.config();

const salt = bcrypt.genSaltSync(15);
const secret = process.env.JWT_SECRET_KEY;

// Create new User
export const newUser = async (req, res) => {
  const { fName, lName, email, phoneNo, pass } = req.body;

  const missingFields = [];

  if (!fName) missingFields.push("fName");
  if (!lName) missingFields.push("lName");
  if (!email) missingFields.push("email");
  if (!phoneNo) missingFields.push("phoneNo");
  if (!pass) missingFields.push("pass");

  if (missingFields.length > 0) {
    return res.status(400).json({
      error: "Missing Fields",
      missingFields,
    });
  }

  const hashPass = bcrypt.hashSync(pass, salt);

  try {
    const newUser = new Auth({
      fName,
      lName,
      email,
      phone: phoneNo,
      password: hashPass,
    });

    await newUser.save();

    res.status(200).json({ msg: "User created successfully" });
  } catch (error) {
    console.log(error);

    if (error.code === 11000) {
      // Duplicate key error for MongoDB
      res.status(400).json({ error: "Email already exists" });
    } else {
      res.status(500).json({ msg: "Database query error" });
    }
  }
};

// Get new user
export const getUser = async (req, res) => {
  const { email, pass } = req.body;

  const missingFields = [];

  if (!email) missingFields.push("email");
  if (!pass) missingFields.push("pass");

  if (missingFields.length > 0) {
    return res.status(400).json({ error: "Missing Fields", missingFields });
  }

  try {
    const user = await Auth.findOne({ email });

    if (!user) {
      return res.status(400).json({ code: 11223, msg: "User does not exist" });
    }

    const isPasswordMatch = bcrypt.compareSync(pass, user.password);

    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ code: 11224, msg: "Password does not match" });
    }

    const token = jwt.sign(
      { email: user.email, userName: user.fName },
      secret,
      {
        expiresIn: "6h",
      }
    );

    res.status(200).json({ msg: "User authenticated successfully", token });
  } catch (error) {
    res.status(500).json({ msg: "Internal error" });
    console.log(error);
  }
};

// Get email of user from token
export const getEmail = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });
  try {
    const decoded = jwt.verify(token, secret);
    const username = decoded.userName;
    res.json({ user: username });
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};
