const {
  createTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,
  getMonthlySummary,
} = require("../models/transaction.model");


const getAllTransactions = async (req, res) => {
  try {
    const { type, month, year, category_id } = req.query;
    const filters = { type, month, year, category_id };

    const transactions = await getTransactions(req.user.id, filters);
    res.status(200).json({ transactions });
  } catch (err) {
    console.error("Get transactions error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


const addTransaction = async (req, res) => {
  try {
    const { title, amount, type, date, notes, category_id } = req.body;

    if (!title || !amount || !type || !date) {
      return res.status(400).json({
        message: "Title, amount, type and date are required",
      });
    }

    const transaction = await createTransaction(
      title,
      amount,
      type,
      date,
      notes,
      req.user.id,
      category_id
    );

    res.status(201).json({ transaction });
  } catch (err) {
    console.error("Add transaction error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


const editTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, amount, type, date, notes, category_id } = req.body;

    if (!title || !amount || !type || !date) {
      return res.status(400).json({
        message: "Title, amount, type and date are required",
      });
    }

    const transaction = await updateTransaction(id, req.user.id, {
      title,
      amount,
      type,
      date,
      notes,
      category_id,
    });

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.status(200).json({ transaction });
  } catch (err) {
    console.error("Edit transaction error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


const removeTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await deleteTransaction(id, req.user.id);

    if (!deleted) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (err) {
    console.error("Delete transaction error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

const getSummary = async (req, res) => {
  try {
    const { month, year } = req.query;

    if (!month || !year) {
      return res.status(400).json({ message: "Month and year are required" });
    }
    const summary = await getMonthlySummary(req.user.id, month, year);
    res.status(200).json({ summary });
  } catch (err) {
    console.error("Get summary error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getAllTransactions,
  addTransaction,
  editTransaction,
  removeTransaction,
  getSummary,
};
