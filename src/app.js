const express = require('express')
const cors    = require('cors')
const helmet  = require('helmet')
const cookieParser = require('cookie-parser')
const { globalLimiter, authLimiter } = require('./middlewares/rateLimit.middleware')
require('./config/db')

const app = express()

app.use(cookieParser())
app.use(helmet())
app.use(cors({
    origin: [
      'http://localhost:5173',
      'http://finance-tracker-frontend-ali.s3-website-us-east-1.amazonaws.com',
      'https://d2kw2dc4i1x4vh.cloudfront.net' // ← add this!
    ],
    credentials: true
}))
app.use(express.json())

// Global rate limit → all routes
app.use(globalLimiter)

app.use('/api/auth', authLimiter,  require('./routes/auth.routes'))
app.use('/api/categories', require('./routes/category.routes'))
app.use('/api/transactions', require('./routes/transaction.routes'))
app.use('/api/budgets',      require('./routes/budget.routes'))
app.use('/api/ai',           require('./routes/ai.routes'))

module.exports = app