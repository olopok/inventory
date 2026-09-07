const { Router } = require("express");
const routesController = require("../controllers/invcontroller");

const inventoryRouter = Router();

inventoryRouter.get("/", routesController.getCategories);

module.exports = inventoryRouter;
