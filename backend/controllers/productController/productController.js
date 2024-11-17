import connectToDatabase from "../../db.js";

// Add Product
export const addProduct = async (req, res) => {
  console.log(req.body);

  const { skuNo, name, category, desc, quantity, price, vendor } = req.body;

  const missingFields = [];

  if (!skuNo) missingFields.push("skuNo");
  if (!name) missingFields.push("name");
  if (!category) missingFields.push("category");
  if (!desc) missingFields.push("desc");
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
      "INSERT INTO product (skuNo, name, category, description, quantity, price, vendor) VALUES (?,?,?,?,?,?,?)",
      [skuNo, name, category, desc, quantity, price, vendor]
    );
    res.status(200).json({ msg: "Product added successfully" });
  } catch (error) {
    console.log(error);

    if (error.code === "ER_DUP_ENTRY") {
      res.status(400).json({ error });
    } else {
      res.status(500).json({ msg: "Database query error" });
    }
  }
};

// Get All Product
export const getProduct = async (req, res) => {
  try {
    const dbConnection = await connectToDatabase();
    if (!dbConnection) throw new Error("Database connection failed");

    const [rows] = await dbConnection.query("SELECT * FROM product");
    console.log(rows);
    res.status(200).json(rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal error" });
  }
};
