const express        = require('express')
const router         = express.Router()
const authMiddleware = require('../middlewares/auth.middleware')
const { transactionValidation } = require('../validations/transaction.validation')
const { validate } = require('../validations')
const {
  getAllTransactions,
  addTransaction,
  editTransaction,
  removeTransaction,
  getSummary
} = require('../controllers/transaction.controller')

router.get('/summary',   authMiddleware, getSummary)
router.get('/',          authMiddleware, getAllTransactions)
router.post('/',         authMiddleware, transactionValidation, validate, addTransaction)
router.put('/:id',       authMiddleware, transactionValidation, validate, editTransaction)
router.delete('/:id',    authMiddleware, removeTransaction)

module.exports = router