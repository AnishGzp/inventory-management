import Category from "../../models/category.js";

// Get All Category
export const getCategory = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal error" });
  }
};

// Delete Category
export const deleteCategory = async (req, res) => {
  const { name } = req.params;

  try {
    const deletedCategory = await Category.findOneAndDelete({ name });

    if (!deletedCategory) {
      return res.status(404).json({ msg: "Category not found" });
    }
    res.status(200).json({ msg: "Category deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};

// Edit Category
export const editCategory = async (req, res) => {
  const { name, _id } = req.body;

  const missingFields = [];

  if (!name) missingFields.push("name");

  if (missingFields.length > 0) {
    return res.status(400).json({ missingFields });
  }

  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      _id,
      { name },
      { new: true, runValidators: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ msg: "Category not found" });
    }
    res.status(200).json({ msg: "Category updated successfully" });
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      // Duplicate key error for MongoDB
      res.status(400).json({
        error: "Category name already exists",
        error: { code: "ER_DUP_ENTRY" },
      });
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
    const newCategory = new Category({ name });
    await newCategory.save();
    res.status(200).json({ msg: "Category added successfully" });
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      // Duplicate key error for MongoDB
      res.status(400).json({ error: "Category name already exists" });
    } else {
      res.status(500).json({ msg: "Database query error" });
    }
  }
};
