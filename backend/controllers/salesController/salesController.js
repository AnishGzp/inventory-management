import connectToDatabase from "../../db.js";

// Get All Sales
export const getSales = async (req, res) => {
  try {
    const dbConnection = await connectToDatabase();
    if (!dbConnection) throw new Error("Database connection failed");

    const [rows] = await dbConnection.query("SELECT * FROM sales");
    res.status(200).json(rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal error" });
  }
};

// Delete Vendors
export const deleteSales = async (req, res) => {
  const { id } = req.params;

  console.log(id);

  try {
    const dbConnection = await connectToDatabase();
    if (!dbConnection) throw new Error("Database connection failed");

    const [rows] = await dbConnection.execute(
      "DELETE FROM sales WHERE id = ? ",
      [id]
    );

    if (rows.affectedRows === 0) {
      return res.status(404).json({ msg: "Sales not found" });
    }
    res.status(200).json({ msg: "Sales deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};
