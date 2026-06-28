const { body } = require('express-validator')

const transactionValidation = [
  body('title')
    .trim()
    .notEmpty().withMessage('Title is required').bail()
    .isLength({ min: 1, max: 150 }).withMessage('Title must be less than 150 characters'),

  body('amount')
    .notEmpty().withMessage('Amount is required').bail()
    .isFloat({ min: 0.01 }).withMessage('Amount must be a positive number')
    .custom(value => {
      if (value > 999999999) throw new Error('Amount is too large')
      return true
    }),

  body('type')
    .notEmpty().withMessage('Type is required').bail()
    .isIn(['income', 'expense']).withMessage('Type must be income or expense'),

  body('date')
    .notEmpty().withMessage('Date is required').bail()
    .isDate().withMessage('Invalid date format'),

  body('notes')
    .optional()
    .trim()
    .isLength({ max: 500 }).withMessage('Notes must be less than 500 characters'),

  body('category_id')
    .optional()
    .isInt({ min: 1 }).withMessage('Invalid category'),
]

module.exports = { transactionValidation }