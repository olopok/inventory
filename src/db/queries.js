const pool = require("./pool");

async function getAllCategories() {
  const { rows } = await pool.query(
    "SELECT c.id, c.name, COUNT(p.id) AS items_quantity FROM categories c LEFT JOIN products p ON p.category_id = c.id GROUP BY c.id, c.name ORDER BY items_quantity DESC",
  );
  console.log(rows);
  return rows;
}

async function getAllCategoryItems(id) {
  const { rows } = await pool.query(
    "SELECT * FROM products WHERE category_id = $1", [id],
  );
  return rows;
}

module.exports = { getAllCategories, getAllCategoryItems };
