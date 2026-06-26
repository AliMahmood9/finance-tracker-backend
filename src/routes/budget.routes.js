const express        = require('express')
const router         = express.Router()
const authMiddleware = require('../middlewares/auth.middleware')
const {
  getBudgetList,
  addBudget,
  removeBudget
} = require('../controllers/budget.controller')

router.get('/',      authMiddleware, getBudgetList)
router.post('/',     authMiddleware, addBudget)
router.delete('/:id', authMiddleware, removeBudget)

module.exports = router