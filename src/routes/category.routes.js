const express        = require('express')
const router         = express.Router()
const authMiddleware = require('../middlewares/auth.middleware')
const {
  getAllCategories,
  addCategory,
  removeCategory
} = require('../controllers/category.controller')

// All category routes are protected
router.get('/',      authMiddleware, getAllCategories)
router.post('/',     authMiddleware, addCategory)
router.delete('/:id', authMiddleware, removeCategory)

module.exports = router