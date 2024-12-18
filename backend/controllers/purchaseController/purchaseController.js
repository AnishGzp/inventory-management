import connectToDatabase from "../../db.js";

// Get All Sales
export const getPurchase = async (req, res) => {
  try {
    const dbConnection = await connectToDatabase();
    if (!dbConnection) throw new Error("Database connection failed");

    const [rows] = await dbConnection.query("SELECT * FROM purchase");
    res.status(200).json(rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal error" });
  }
};

// Delete Purchase
export const deletePurchase = async (req, res) => {
  const { id } = req.params;

  console.log(id);

  try {
    const dbConnection = await connectToDatabase();
    if (!dbConnection) throw new Error("Database connection failed");

    const [rows] = await dbConnection.execute(
      "DELETE FROM purchase WHERE id = ? ",
      [id]
    );

    if (rows.affectedRows === 0) {
      return res.status(404).json({ msg: "Purchase not found" });
    }
    res.status(200).json({ msg: "Purchase deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};

// Add Purchase
export const addPurchase = async (req, res) => {
  const { productId, sellingPrice, product, quantity, price, vendor, status } =
    req.body;

  const missingFields = [];

  if (!status) missingFields.push("status");
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
      "SELECT quantity,price FROM product WHERE id=?",
      [productId]
    );

    const getQuantity = rows.length ? parseInt(rows[0].quantity) : null;

    if (getQuantity === null) {
      return res.status(404).json({ msg: "Product not found" });
    }

    const remainingQuantity = getQuantity + parseInt(quantity);

    const calculatedPrice = parseFloat(rows[0].price) * parseInt(quantity, 10);

    const [updateQuantity] = await dbConnection.query(
      "UPDATE product SET quantity = ? WHERE id = ?",
      [remainingQuantity, productId]
    );

    const price = quantity * sellingPrice;

    const [result] = await dbConnection.query(
      "INSERT INTO purchase (product,vendor,quantity,selling_price,price,status) VALUES (?,?,?,?,?,?)",
      [product, vendor, quantity, sellingPrice, price, status]
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
