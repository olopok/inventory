const { body, validationResult } = require("express-validator");
const db = require("../db/queries");

function homeRender(req, res) {
  res.render("index", { titleh1: "Shop Inventory", categories: [] });
}

async function getCategories(req, res) {
  const categories = await db.getAllCategories();
  res.render("index", { titleh1: "Shop Inventory", categories: categories });
}

async function getCategoryItems(req, res) {
  const { id } = req.params;
  const categoryItems = await db.getAllCategoryItems(id);
  console.log("items", categoryItems);
}
module.exports = { homeRender, getCategories, getCategoryItems };
