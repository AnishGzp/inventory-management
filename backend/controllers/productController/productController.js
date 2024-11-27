import connectToDatabase from "../../db.js";

// Add Product
export const addProduct = async (req, res) => {
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
    res.status(200).json(rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal error" });
  }
};

// Edit products
export const editProduct = async (req, res) => {
  const { skuNo, name, category, description, quantity, price, vendor } =
    req.body;

  const missingFields = [];

  if (!skuNo) missingFields.push("skuNo");
  if (!name) missingFields.push("name");
  if (!category) missingFields.push("category");
  if (!description) missingFields.push("description");
  if (!quantity) missingFields.push("quantity");
  if (!price) missingFields.push("price");
  if (!vendor) missingFields.push("vendor");

  if (missingFields.length > 0) {
    return res.status(400).json({ missingFields });
  }

  try {
    const dbConnection = await connectToDatabase();
    if (!dbConnection) throw new Error("Database connection failed");

    const updateFields = [];
    const updateValues = [];

    if (name) {
      updateFields.push("name = ?");
      updateValues.push(name);
    }
    if (category) {
      updateFields.push("category = ?");
      updateValues.push(category);
    }
    if (description) {
      updateFields.push("description = ?");
      updateValues.push(description);
    }
    if (quantity) {
      updateFields.push("quantity = ?");
      updateValues.push(quantity);
    }
    if (price) {
      updateFields.push("price = ?");
      updateValues.push(price);
    }
    if (vendor) {
      updateFields.push("vendor = ?");
      updateValues.push(vendor);
    }

    const query = `UPDATE product SET ${updateFields.join(
      ", "
    )} WHERE skuNo = ?`;

    updateValues.push(skuNo);

    const [rows] = await dbConnection.execute(query, updateValues);

    if (rows.affectedRows === 0) {
      return res.status(404).json({ msg: "Product not found" });
    }
    res.status(200).json({ msg: "Product deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};

// Delete products
export const deleteProduct = async (req, res) => {
  const { skuNo } = req.params;

  try {
    const dbConnection = await connectToDatabase();
    if (!dbConnection) throw new Error("Database connection failed");

    const [rows] = await dbConnection.execute(
      "DELETE FROM product WHERE skuNO = ? ",
      [skuNo]
    );

    if (rows.affectedRows === 0) {
      return res.status(404).json({ msg: "Product not found" });
    }
    res.status(200).json({ msg: "Product deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};
