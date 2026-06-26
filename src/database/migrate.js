const { Pool } = require('pg')
const fs       = require('fs')
const path     = require('path')
require('dotenv').config()

const pool = new Pool({
  host     : process.env.DB_HOST,
  port     : process.env.DB_PORT,
  database : process.env.DB_NAME,
  user     : process.env.DB_USER,
  password : process.env.DB_PASSWORD,
})

const migrate = async () => {
  try {
    console.log('🔄 Running migrations...')

    const sql = fs.readFileSync(
      path.join(__dirname, 'migrate.sql'),
      'utf8'
    )

    await pool.query(sql)
    console.log('✅ Database migrated successfully!')
    console.log('✅ Default categories inserted!')

  } catch (err) {
    console.error('❌ Migration failed:', err)
  } finally {
    await pool.end()
  }
}

migrate()