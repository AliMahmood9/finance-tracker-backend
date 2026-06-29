const { Pool, types } = require('pg')
require('dotenv').config()

// Fix date timezone issue
types.setTypeParser(1082, val => val)

const pool = new Pool({
  host     : process.env.DB_HOST,
  port     : process.env.DB_PORT,
  database : process.env.DB_NAME,
  user     : process.env.DB_USER,
  password : process.env.DB_PASSWORD,
  ssl: {
    rejectUnauthorized: false // ← add this!
  }
})

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('❌ PostgreSQL connection error:', err)
  } else {
    console.log('✅ Connected to PostgreSQL at:', res.rows[0].now)
  }
})

pool.on('error', (err) => {
  console.error('❌ PostgreSQL error:', err)
  process.exit(-1)
})

module.exports = pool