const {
  getCategories,
  createCategory,
  deleteCategory,
} = require("../models/catgeory.model");

const getAllCategories = async (req, res) => {
  try {
    const categories = await getCategories(req.user.id);
    res.status(200).json({ categories });
  } catch (err) {
    console.error("Get categories error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

const addCategory = async (req, res) => {
  try {
    const { name, type, icon } = req.body;

    if (!name || !type) {
      return res.status(400).json({ message: "Name and type are required" });
    }

    const category = await createCategory(name, type, icon, req.user.id);
    res.status(201).json({ category });
  } catch (err) {
    console.error("Create category error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

const removeCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await deleteCategory(id, req.user.id);

    if (!deleted) {
      return res.status(404).json({
        message: "Category not found or cannot delete default category",
      });
    }

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (err) {
    console.error("Delete category error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getAllCategories, addCategory, removeCategory };
