import connectToDatabase from "../../db.js";
import bcrypt from "bcryptjs";

export const newUser = async (req, res) => {
  if (
    !req.body.fName ||
    !req.body.lName ||
    !req.body.email ||
    !req.body.phoneNo ||
    !req.body.pass
  ) {
    res.status(400).json({ msg: "Enter all the fields" });
    return;
  }

  const { fName, lName, email, phoneNo, pass } = req.body;

  const salt = bcrypt.genSaltSync(15);
  const hashPass = bcrypt.hashSync(pass, salt);

  let dbConnection;
  try {
    dbConnection = await connectToDatabase();

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
      res.status(500).send("Database query error");
    }
  } finally {
    if (dbConnection) await dbConnection.end();
  }
};
