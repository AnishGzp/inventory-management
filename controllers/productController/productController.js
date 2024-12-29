import Product from "../../models/product.js";

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
    const newProduct = new Product({
      skuNo,
      name,
      category,
      description: desc,
      quantity,
      price,
      vendor,
    });
    await newProduct.save();
    res.status(200).json({ msg: "Product added successfully" });
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      // Duplicate key error for MongoDB
      res.status(400).json({
        error: "SKU number already exists",
        error: { code: "ER_DUP_ENTRY" },
      });
    } else {
      res.status(500).json({ msg: "Database query error" });
    }
  }
};

// Get All Product
export const getProduct = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal error" });
  }
};

// Edit Product
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
    const updatedProduct = await Product.findOneAndUpdate(
      { skuNo },
      { name, category, description, quantity, price, vendor },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ msg: "Product not found" });
    }
    res.status(200).json({ msg: "Product updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};

// Delete Product
export const deleteProduct = async (req, res) => {
  const { skuNo } = req.params;

  try {
    const deletedProduct = await Product.findOneAndDelete({ skuNo });

    if (!deletedProduct) {
      return res.status(404).json({ msg: "Product not found" });
    }
    res.status(200).json({ msg: "Product deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};
