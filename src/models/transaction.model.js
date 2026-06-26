const pool = require("../config/db");

const createTransaction = async (
  title,
  amount,
  type,
  date,
  notes,
  user_id,
  category_id
) => {
  const result = await pool.query(
    `INSERT INTO transactions 
        (title, amount, type, date, notes, user_id, category_id) 
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *
        `,
    [title, amount, type, date, notes, user_id, category_id]
  );
  return result.rows[0];
};

const getTransactions = async (user_id, filters = {}) => {
  let query = `
      SELECT 
        t.*,
        c.name as category_name,
        c.icon as category_icon
      FROM transactions t
      LEFT JOIN categories c ON t.category_id = c.id
      WHERE t.user_id = $1
    `;
  const values = [user_id];
  let i = 2;

  if (filters.type) {
    query += ` AND t.type = $${i}`;
    values.push(filters.type);
    i++;
  }

  if (filters.month && filters.year) {
    query += ` AND EXTRACT(MONTH FROM t.date) = $${i}`;
    values.push(filters.month);
    i++;
    query += ` AND EXTRACT(YEAR FROM t.date) = $${i}`;
    values.push(filters.year);
    i++;
  }

  if (filters.category_id) {
    query += ` AND t.category_id = $${i}`;
    values.push(filters.category_id);
    i++;
  }

  query += ` ORDER BY t.date DESC, t.created_at DESC`;

  const result = await pool.query(query, values);
  return result.rows;
};

const updateTransaction = async (id, user_id, fields) => {
  const { title, amount, type, date, notes, category_id } = fields;
  const result = await pool.query(
    `UPDATE transactions
       SET title=$1, amount=$2, type=$3, date=$4, notes=$5, category_id=$6
       WHERE id=$7 AND user_id=$8
       RETURNING *`,
    [title, amount, type, date, notes, category_id, id, user_id]
  );
  return result.rows[0];
};

const deleteTransaction = async (id, user_id) => {
  const result = await pool.query(
    `DELETE FROM transactions
       WHERE id=$1 AND user_id=$2
       RETURNING *`,
    [id, user_id]
  );
  return result.rows[0];
};

const getMonthlySummary = async (user_id, month, year) => {
  const result = await pool.query(
    `SELECT
        type,
        SUM(amount) as total
       FROM transactions
       WHERE user_id=$1
       AND EXTRACT(MONTH FROM date) = $2
       AND EXTRACT(YEAR FROM date)  = $3
       GROUP BY type`,
    [user_id, month, year]
  );
  const summary = { income: 0, expense: 0, balance: 0 };
  result.rows.forEach((row) => {
    summary[row.type] = parseFloat(row.total);
  });
  summary.balance = summary.income - summary.expense;

  return summary;
};

module.exports = {
  createTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,
  getMonthlySummary,
};
