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

// Add Sales
export const addSales = async (req, res) => {
  const { customer, product, quantity, price, vendor } = req.body;

  const missingFields = [];

  if (!customer) missingFields.push("customer");
  if (!product) missingFields.push("product");
  if (!quantity) missingFields.push("quantity");
  if (!price) missingFields.push("price");
  if (!vendor) missingFields.push("vendor");

  if (missingFields.length > 0) {
    return res.status(400).json({ missingFields });
  }

  try {
    const dbConnection = await connectToDatabase();
    if (!dbConnection) {
      throw new Error("Database connection Error");
    }

    const [rows] = await dbConnection.query(
      "SELECT quantity,price FROM product WHERE name=?",
      [product]
    );

    const getQuantity = rows.length ? parseInt(rows[0].quantity) : null;

    if (getQuantity === null) {
      return res.status(404).json({ msg: "Product not found" });
    }

    const remainingQuantity = getQuantity - parseInt(quantity);

    if (remainingQuantity < 0) {
      return res.status(400).json({ code: 2211, msg: "Not enough stocks" });
    }

    const calculatedPrice = parseFloat(rows[0].price) * parseInt(quantity, 10);

    const [updateQuantity] = await dbConnection.query(
      "UPDATE product SET quantity = ? WHERE name = ?",
      [remainingQuantity, product]
    );

    const [result] = await dbConnection.query(
      "INSERT INTO sales (customer,productName,vandorName,quantity,price) VALUES (?,?,?,?,?)",
      [customer, product, vendor, quantity, calculatedPrice]
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
