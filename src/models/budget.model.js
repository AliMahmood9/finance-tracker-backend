const pool = require("../config/db");

const getBudgets = async (user_id, month, year) => {
    const query = `
      SELECT
        b.*,
        c.name as category_name,
        c.icon as category_icon,
        COALESCE(SUM(t.amount), 0) as spent
      FROM budgets b
      LEFT JOIN categories c ON b.category_id = c.id
      LEFT JOIN transactions t
        ON t.category_id = b.category_id
        AND t.user_id = b.user_id
        AND t.type = 'expense'
        AND EXTRACT(MONTH FROM t.date) = b.month
        AND EXTRACT(YEAR FROM t.date) = b.year
      WHERE b.user_id = $1
      AND b.month = $2
      AND b.year = $3
      GROUP BY b.id, c.name, c.icon
      ORDER BY c.name ASC
    `;
  
    const result = await pool.query(query, [user_id, month, year]);
    return result.rows;
  };

const createBudget = async (user_id, category_id, amount, month, year) => {
  const result = await pool.query(
    `INSERT INTO budgets (user_id, category_id, amount, month, year)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (user_id, category_id, month, year)
       DO UPDATE SET amount = $3
       RETURNING *`,
    [user_id, category_id, amount, month, year]
  );
  return result.rows[0];
};

const deleteBudget = async (id, user_id) => {
  const result = await pool.query(
    `DELETE FROM budgets
       WHERE id = $1
       AND user_id = $2
       RETURNING *`,
    [id, user_id]
  );
  return result.rows[0];
};

module.exports = { createBudget, deleteBudget, getBudgets };
