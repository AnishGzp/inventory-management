import connectToDatabase from "../../db.js";

// Get All Category
export const getCategory = async (req, res) => {
  try {
    const dbConnection = await connectToDatabase();
    if (!dbConnection) throw new Error("Database connection failed");

    const [rows] = await dbConnection.query("SELECT * FROM category");
    res.status(200).json(rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal error" });
  }
};

// Delete Category
export const deleteCategory = async (req, res) => {
  const { name } = req.params;

  try {
    const dbConnection = await connectToDatabase();
    if (!dbConnection) throw new Error("Database connection failed");

    const [rows] = await dbConnection.execute(
      "DELETE FROM category WHERE name = ? ",
      [name]
    );

    if (rows.affectedRows === 0) {
      return res.status(404).json({ msg: "Category not found" });
    }
    res.status(200).json({ msg: "Category deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};

// Edit Categoryy
export const editCategory = async (req, res) => {
  const { name, id } = req.body;

  console.log(name);

  const missingFields = [];

  if (!name) missingFields.push("name");

  if (missingFields.length > 0) {
    return res.status(400).json({ missingFields });
  }

  try {
    const dbConnection = await connectToDatabase();
    if (!dbConnection) throw new Error("Database connection failed");

    const [rows] = await dbConnection.execute(
      "UPDATE category SET name=? WHERE id=?",
      [name, id]
    );

    if (rows.affectedRows === 0) {
      return res.status(404).json({ msg: "Category not found" });
    }
    res.status(200).json({ msg: "Category updated successfully" });
  } catch (error) {
    console.log(error);
    if (error.code === "ER_DUP_ENTRY") {
      res.status(400).json({ error });
    } else {
      res.status(500).json({ msg: "Database query error" });
    }
  }
};

// Add Category
export const addCategory = async (req, res) => {
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
      "INSERT INTO category (name) VALUES (?)",
      [name]
    );
    res.status(200).json({ msg: "category added successfully" });
  } catch (error) {
    console.log(error);

    if (error.code === "ER_DUP_ENTRY") {
      res.status(400).json({ error });
    } else {
      res.status(500).json({ msg: "Database query error" });
    }
  }
};
