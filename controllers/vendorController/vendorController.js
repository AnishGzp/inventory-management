import connectToDatabase from "../../db.js";

// Get All Vendors
export const getVendor = async (req, res) => {
  try {
    const dbConnection = await connectToDatabase();
    if (!dbConnection) throw new Error("Database connection failed");

    const [rows] = await dbConnection.query("SELECT * FROM vendor");
    res.status(200).json(rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal error" });
  }
};

// Delete Vendors
export const deleteVendor = async (req, res) => {
  const { name } = req.params;

  try {
    const dbConnection = await connectToDatabase();
    if (!dbConnection) throw new Error("Database connection failed");

    const [rows] = await dbConnection.execute(
      "DELETE FROM vendor WHERE name = ? ",
      [name]
    );

    if (rows.affectedRows === 0) {
      return res.status(404).json({ msg: "Vendor not found" });
    }
    res.status(200).json({ msg: "Vendor deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};

// Add Vendors
export const addVendor = async (req, res) => {
  const { name } = req.body;

  const missingFields = [];

  if (!name) missingFields.push("name");

  if (missingFields.length > 0) {
    return res.status(400).json({ missingFields });
  }

  try {
    const dbConnection = await connectToDatabase();
    if (!dbConnection) {
      throw new Error("Database connection Error");
    }

    const [rows] = await dbConnection.query(
      "INSERT INTO vendor (name) VALUES (?)",
      [name]
    );
    res.status(200).json({ msg: "Vendor added successfully" });
  } catch (error) {
    console.log(error);

    if (error.code === "ER_DUP_ENTRY") {
      res.status(400).json({ error });
    } else {
      res.status(500).json({ msg: "Database query error" });
    }
  }
};

// Edit Vendors
export const editVendor = async (req, res) => {
  const { name, id } = req.body;

  const missingFields = [];

  if (!name) missingFields.push("name");

  if (missingFields.length > 0) {
    return res.status(400).json({ missingFields });
  }

  try {
    const dbConnection = await connectToDatabase();
    if (!dbConnection) throw new Error("Database connection failed");

    const [rows] = await dbConnection.execute(
      "UPDATE vendor SET name=? WHERE id=?",
      [name, id]
    );

    if (rows.affectedRows === 0) {
      return res.status(404).json({ msg: "Vendor not found" });
    }
    res.status(200).json({ msg: "Vendor updated successfully" });
  } catch (error) {
    console.log(error);
    if (error.code === "ER_DUP_ENTRY") {
      res.status(400).json({ error });
    } else {
      res.status(500).json({ msg: "Database query error" });
    }
  }
};
