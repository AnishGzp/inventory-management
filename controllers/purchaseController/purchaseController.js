import Purchase from "../../models/purchase.js";
import Product from "../../models/product.js"; // Assuming Product model exists

// Get All Sales
export const getPurchase = async (req, res) => {
  try {
    const purchases = await Purchase.find();
    res.status(200).json(purchases);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal error" });
  }
};

// Delete Purchase
export const deletePurchase = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Purchase.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ msg: "Purchase not found" });
    }
    res.status(200).json({ msg: "Purchase deleted successfully" });
  } catch (error) {
    console.error(error);
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
    const productData = await Product.findById(productId);
    if (!productData) {
      return res.status(404).json({ msg: "Product not found" });
    }

    const remainingQuantity =
      parseInt(productData.quantity, 10) + parseInt(quantity, 10);
    const calculatedPrice =
      parseFloat(productData.price) * parseInt(quantity, 10);

    // Update product quantity
    productData.quantity = remainingQuantity;
    await productData.save();

    // Create a new purchase
    const purchase = new Purchase({
      product,
      vendor,
      quantity,
      selling_price: sellingPrice,
      price: calculatedPrice,
      status,
    });

    await purchase.save();
    res.status(200).json({ msg: "Purchase added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Database query error" });
  }
};
