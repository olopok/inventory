const { body, validationResult } = require("express-validator");
const db = require("../db/queries");

async function getCategories(req, res) {
  const categories = await db.getAllCategories();
  res.render("index", { titleh1: "Shop Inventory", categories: categories });
}

module.exports = { getCategories };
