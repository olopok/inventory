const pool = require("./pool");

async function getAllCategories() {
  const { rows } = await pool.query(
    "SELECT c.id, c.name, COUNT(p.id) AS items_quantity FROM categories c LEFT JOIN products p ON p.category_id = c.id GROUP BY c.id, c.name ORDER BY items_quantity DESC",
  );
  return rows;
}

async function getAllCategoryItems(id) {
  const { rows } = await pool.query(
    "SELECT * FROM products WHERE category_id = $1",
    [id],
  );
  return rows;
}

async function getAllProducts() {
  const { rows } = await pool.query("SELECT * FROM products");
  return rows;
}

async function getInventoryCategories() {
  const { rows } = await pool.query("SELECT * FROM categories");
  return rows;
}

async function getInventory() {
  const [categories, products] = await Promise.all([
    getInventoryCategories(),
    getAllProducts(),
  ]);

  return { categories, products };
}

async function insertCategory(name) {
  await pool.query("INSERT INTO categories (name) VALUES (UPPER($1))", [name]);
}

module.exports = {
  getAllCategories,
  getAllCategoryItems,
  getAllProducts,
  getInventory,
  insertCategory,
};
