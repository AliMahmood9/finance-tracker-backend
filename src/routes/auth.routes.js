const express = require('express')
const router  = express.Router()
const { register, login, logout, getMe } = require('../controllers/auth.controller')
const authMiddleware = require('../middlewares/auth.middleware')
const { registerValidation, loginValidation } = require('../validations/auth.validation')
const { validate } = require('../validations')

router.post('/register', registerValidation, validate, register)
router.post('/login',    loginValidation,    validate, login)
router.post('/logout',   logout)
router.get('/me',        authMiddleware, getMe)

module.exports = router