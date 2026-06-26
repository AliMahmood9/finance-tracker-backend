const express = require('express')
const cors    = require('cors')
const helmet  = require('helmet')
require('./config/db')

const app = express()

app.use(helmet())
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))
app.use(express.json())


app.use('/api/auth',require('./routes/auth.routes'))
app.use('/api/categories', require('./routes/category.routes'))
app.use('/api/transactions', require('./routes/transaction.routes'))
app.use('/api/budgets',      require('./routes/budget.routes'))
app.use('/api/ai',           require('./routes/ai.routes'))

module.exports = app