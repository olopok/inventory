const { body, validationResult } = require("express-validator");
const db = require("../db/queries");

function homeRender(req, res) {
  res.render("index", { categories: [], items: [], products: [] });
}

async function getCategories(req, res) {
  const categories = await db.getAllCategories();
  res.render("index", { categories: categories, items: [], products: [] });
}

async function getCategoryItems(req, res) {
  const { id } = req.params;
  const categoryItems = await db.getAllCategoryItems(id);
  const categories = await db.getAllCategories();
  res.render("index", {
    items: categoryItems,
    categories: categories,
    products: [],
  });
}

async function getProducts(req, res) {
  const products = await db.getAllProducts();
  res.render("index", { products: products, categories: [], items: [] });
}

async function getInventory(req, res) {
  const { categories, products } = await db.getInventory();

  res.render("editdata", {
    categories,
    products,
    // items: [],
  });
}

async function createCategoryPost(req, res) {
  const { addcat } = req.body;
  console.log("The body:", req.body);
  await db.insertCategory(addcat);
  res.redirect("editdata", );
}

module.exports = {
  homeRender,
  getCategories,
  getCategoryItems,
  getProducts,
  getInventory,
  createCategoryPost,
};
