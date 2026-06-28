const express        = require('express')
const router         = express.Router()
const authMiddleware = require('../middlewares/auth.middleware')
const { categoryValidation } = require('../validations/category.validation')
const { validate } = require('../validations')
const {
  getAllCategories,
  addCategory,
  removeCategory
} = require('../controllers/category.controller')

router.get('/',       authMiddleware, getAllCategories)
router.post('/',      authMiddleware, categoryValidation, validate, addCategory)
router.delete('/:id', authMiddleware, removeCategory)

module.exports = router