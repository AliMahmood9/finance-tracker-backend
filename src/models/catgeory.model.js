const pool = require('../config/db')

// Get all categories for a user
// (default ones + their own custom ones)
const getCategories = async (user_id) => {
  const result = await pool.query(
    `SELECT * FROM categories
     WHERE is_default = TRUE
     OR user_id = $1
     ORDER BY is_default DESC, name ASC`,
    [user_id]
  )
  return result.rows
}

// Create a custom category
const createCategory = async (name, type, icon, user_id) => {
  const result = await pool.query(
    `INSERT INTO categories (name, type, icon, is_default, user_id)
     VALUES ($1, $2, $3, FALSE, $4)
     RETURNING *`,
    [name, type, icon, user_id]
  )
  return result.rows[0]
}

// Delete a custom category
const deleteCategory = async (id, user_id) => {
  const result = await pool.query(
    `DELETE FROM categories
     WHERE id = $1
     AND user_id = $2
     AND is_default = FALSE
     RETURNING *`,
    [id, user_id]
  )
  return result.rows[0]
}

module.exports = { getCategories, createCategory, deleteCategory }