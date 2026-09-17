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

async function editCategory(id, name) {
  const { rows } = await pool.query(
    "SELECT name FROM categories WHERE id = $1",
    [id],
  );

  if (rows[0]?.name === "UNCATEGORISED") {
    return true;
  }

  await pool.query("UPDATE categories SET name = UPPER($2) WHERE id = $1", [
    id,
    name,
  ]);
}

async function deleteCategory(id) {
  const { rows } = await pool.query(
    "SELECT name FROM categories WHERE id = $1",
    [id],
  );

  if (rows[0]?.name === "UNCATEGORISED") {
    return true;
  }

  await pool.query("DELETE FROM categories WHERE id = $1", [id]);
}

module.exports = {
  getAllCategories,
  getAllCategoryItems,
  getAllProducts,
  getInventory,
  insertCategory,
  editCategory,
  deleteCategory,
};
