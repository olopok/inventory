const { body, validationResult } = require("express-validator");
const db = require("../db/queries");

function homeRender(req, res) {
  res.render("index", { categories: [], items: [] });
}

async function getCategories(req, res) {
  const categories = await db.getAllCategories();
  res.render("index", { categories: categories, items: [] });
}

async function getCategoryItems(req, res) {
  const { id } = req.params;
  const categoryItems = await db.getAllCategoryItems(id);
  const categories = await db.getAllCategories();
  res.render("index", { items: categoryItems, categories: categories });
}
module.exports = { homeRender, getCategories, getCategoryItems };
