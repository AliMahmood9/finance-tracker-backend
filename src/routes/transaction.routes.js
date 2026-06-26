const express        = require('express')
const router         = express.Router()
const authMiddleware = require('../middlewares/auth.middleware')
const {
  getAllTransactions,
  addTransaction,
  editTransaction,
  removeTransaction,
  getSummary
} = require('../controllers/transaction.controller')

router.get('/summary',  authMiddleware, getSummary)
router.get('/',         authMiddleware, getAllTransactions)
router.post('/',        authMiddleware, addTransaction)
router.put('/:id',      authMiddleware, editTransaction)
router.delete('/:id',   authMiddleware, removeTransaction)

module.exports = router