import Sales from "../../models/sales.js"; // Assuming you have a Sales model
import Products from "../../models/product.js"; // Assuming you have a Products model

// Get All Sales
export const getSales = async (req, res) => {
  try {
    const sales = await Sales.find({});

    res.status(200).json(sales);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal error" });
  }
};

// Delete Sales
export const deleteSales = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Sales.deleteOne({ _id: id }); // Delete by ID

    if (result.deletedCount === 0) {
      return res.status(404).json({ msg: "Sales not found" });
    }

    res.status(200).json({ msg: "Sales deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error.message });
  }
};

// Add Sales
export const addSales = async (req, res) => {
  const { productId, customer, product, quantity, price, vendor } = req.body;

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
    // Find the product by ID
    const productRecord = await Products.findOne({ _id: productId });

    if (!productRecord) {
      return res.status(404).json({ msg: "Product not found" });
    }

    const availableQuantity = productRecord.quantity;
    const remainingQuantity = availableQuantity - parseInt(quantity, 10);

    if (remainingQuantity < 0) {
      return res.status(400).json({ code: 2211, msg: "Not enough stocks" });
    }

    const calculatedPrice =
      parseFloat(productRecord.price) * parseInt(quantity, 10);

    // Update product quantity
    await Products.updateOne(
      { _id: productId },
      { $set: { quantity: remainingQuantity } }
    );

    // Insert a new sales record
    const newSale = new Sales({
      customer,
      productName: product,
      vandorName: vendor,
      quantity,
      price: calculatedPrice,
    });

    await newSale.save();

    res.status(200).json({ msg: "Sale added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Database query error" });
  }
};
