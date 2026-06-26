const {
  getMonthlySummary,
} = require("../models/transaction.model");
const { getBudgets } = require("../models/budget.model");
const { askClaude } = require("../services/claude.service");

const getInsights = async (req, res) => {
  try {
    const { month, year } = req.query;
    const user_id = req.user.id;
    const summary = await getMonthlySummary(user_id, month, year);
    const budgetList = await getBudgets(user_id, month, year);

    const prompt = `
    You are a financial advisor for a Pakistani user.
    All amounts are in PKR (Pakistani Rupees).
    Analyze this data for month ${month}/${year}:
    Income: ${summary.income} PKR
    Expense: ${summary.expense} PKR
    Balance: ${summary.balance} PKR
    Budgets: ${JSON.stringify(budgetList)}
    Give 3 short insights. Use PKR not ₹.
      `;
    const insights = await askClaude(prompt);
    res.status(200).json({ insights });
  } catch (err) {
    console.error("Get insights error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports  = { getInsights }
