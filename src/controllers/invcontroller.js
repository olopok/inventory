const { body, validationResult } = require("express-validator");

function homeRender(req, res) {
  res.render("index", { titleh1: "Shop Inventory" });
}

module.exports = {homeRender};
