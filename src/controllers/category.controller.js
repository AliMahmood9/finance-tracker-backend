const {
  getCategories,
  createCategory,
  deleteCategory,
} = require("../models/catgeory.model");

const getAllCategories = async (req, res, next) => {
  try {
    const categories = await getCategories(req.user.id);
    res.status(200).json({ categories });
  } catch (err) {
    next(err);
  }
};

const addCategory = async (req, res, next) => {
  try {
    const { name, type, icon } = req.body;

    if (!name || !type) {
      return res.status(400).json({ message: "Name and type are required" });
    }

    const category = await createCategory(name, type, icon, req.user.id);
    res.status(201).json({ category });
  } catch (err) {
    next(err);
  }
};

const removeCategory = async (req, res, next) => {
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
    next(err);
  }
};

module.exports = { getAllCategories, addCategory, removeCategory };
