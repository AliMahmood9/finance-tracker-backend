const { body } = require('express-validator')

const budgetValidation = [
  body('category_id')
    .notEmpty().withMessage('Category is required')
    .isInt({ min: 1 }).withMessage('Invalid category'),

  body('amount')
    .notEmpty().withMessage('Amount is required')
    .isFloat({ min: 0.01 }).withMessage('Amount must be a positive number')
    .custom(value => {
      if (value > 999999999) throw new Error('Amount is too large')
      return true
    }),

  body('month')
    .notEmpty().withMessage('Month is required')
    .isInt({ min: 1, max: 12 }).withMessage('Month must be between 1 and 12'),

  body('year')
    .notEmpty().withMessage('Year is required')
    .isInt({ min: 2000, max: 2100 }).withMessage('Invalid year'),
]

module.exports = { budgetValidation }