import Vendor from "../../models/Vendor.js";

// Get All Vendors
export const getVendor = async (req, res) => {
  try {
    const vendors = await Vendor.find(); // Fetch all vendors
    res.status(200).json(vendors);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal error" });
  }
};

// Delete Vendors
export const deleteVendor = async (req, res) => {
  const { name } = req.params;

  try {
    const result = await Vendor.deleteOne({ name }); // Delete vendor by name

    if (result.deletedCount === 0) {
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
    const vendor = new Vendor({ name }); // Create a new vendor
    await vendor.save(); // Save to MongoDB
    res.status(200).json({ msg: "Vendor added successfully" });
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      // MongoDB duplicate key error
      res.status(400).json({ error: "Vendor already exists" });
    } else {
      res.status(500).json({ msg: "Database query error" });
    }
  }
};

// Edit Vendors
export const editVendor = async (req, res) => {
  const { name, _id } = req.body;

  const missingFields = [];
  if (!name) missingFields.push("name");

  if (missingFields.length > 0) {
    return res.status(400).json({ missingFields });
  }

  try {
    const vendor = await Vendor.findByIdAndUpdate(
      _id,
      { name }, // Update the vendor's name
      { new: true, runValidators: true } // Return the updated vendor and validate
    );

    if (!vendor) {
      return res.status(404).json({ msg: "Vendor not found" });
    }
    res.status(200).json({ msg: "Vendor updated successfully" });
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      // MongoDB duplicate key error
      res.status(400).json({ error: "Vendor already exists" });
    } else {
      res.status(500).json({ msg: "Database query error" });
    }
  }
};
