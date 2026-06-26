const {
    getBudgets,
    createBudget,
    deleteBudget
  } = require('../models/budget.model')
  
  const getBudgetList = async (req, res) => {
    try {
       const { month, year }  = req.query 
       const user_id = req.user.id;
      const budgetList = await getBudgets(user_id, month, year)
      res.status(200).json({ budgetList })
    } catch (err) {
      console.error('Get budgetList error:', err)
      res.status(500).json({ message: 'Server error' })
    }
  }
  
  const addBudget = async (req, res) => {
    try {
      const { category_id, amount, month, year } = req.body
      const user_id = req.user.id
  
      if (!amount || !category_id || !month || !year) {
        return res.status(400).json({ message: 'Amount and category are required' })
      }
  
      const budget = await createBudget(user_id, category_id, amount, month, year)
      res.status(201).json({ budget })
    } catch (err) {
      console.error('Create budget error:', err)
      res.status(500).json({ message: 'Server error' })
    }
  }
  
  const removeBudget = async (req, res) => {
    try {
      const { id } = req.params
  
      const deleted = await deleteBudget(id, req.user.id)
  
      if (!deleted) {
        return res.status(404).json({ 
          message: 'Budget not found or cannot delete' 
        })
      }
  
      res.status(200).json({ message: 'Budget deleted successfully' })
    } catch (err) {
      console.error('Delete budget error:', err)
      res.status(500).json({ message: 'Server error' })
    }
  }
  
  module.exports = { getBudgetList, addBudget, removeBudget }