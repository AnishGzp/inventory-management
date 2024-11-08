import connectToDatabase from "../../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secret = process.env.JWT_SECRET_KEY;

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

  const salt = bcrypt.genSaltSync(15);
  const hashPass = bcrypt.hashSync(pass, salt);

  try {
    const dbConnection = await connectToDatabase();

    if (!dbConnection) {
      throw new Error("No database connection");
    }
    const [rows] = await dbConnection.query(
      "INSERT INTO auth (fName,lName,email,phone,password) VALUES (?, ?, ?, ?, ?)",
      [fName, lName, email, phoneNo, hashPass]
    );
    res.status(200).json({ msg: "User created successully" });
  } catch (error) {
    console.log(error);

    if (error.code === "ER_DUP_ENTRY") {
      res.status(400).json({ error });
    } else {
      res.status(500).json({ msg: "Database query error" });
    }
  }
};

export const getUser = async (req, res) => {
  const { email, pass } = req.body;

  const missingFields = [];

  if (!email) missingFields.push("email");
  if (!pass) missingFields.push("pass");

  if (missingFields.length > 0) {
    return res.status(400).json({ error: "Missong Fields", missingFields });
  }

  try {
    const dbConnection = await connectToDatabase();

    if (!dbConnection) throw new Error("Database connection Error");

    const [rows] = await dbConnection.query(
      `SELECT * FROM auth WHERE email=?`,
      [email]
    );

    if (rows.length <= 0) {
      return res.status(400).json({ code: 11223, msg: "User does not exist" });
    }

    const dbPass = rows[0].password;

    const isPasswordMatch = bcrypt.compareSync(pass, dbPass);

    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ code: 11224, msg: "Password does not match" });
    }

    const token = jwt.sign({ email: rows[0].email }, secret, {
      expiresIn: "1h",
    });

    res.status(200).json({ msg: "User authenticated successfull", token });
  } catch (error) {
    res.status(500).json({ msg: "Internal error" });
  }
};
