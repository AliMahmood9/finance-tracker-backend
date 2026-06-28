const { body } = require('express-validator')

const categoryValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 1, max: 100 }).withMessage('Name must be less than 100 characters'),

  body('type')
    .notEmpty().withMessage('Type is required')
    .isIn(['income', 'expense']).withMessage('Type must be income or expense'),

  body('icon')
    .optional()
    .trim()
    .isLength({ max: 50 }).withMessage('Icon must be less than 50 characters'),
]

module.exports = { categoryValidation }