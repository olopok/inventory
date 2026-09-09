const { Router } = require("express");
const routesController = require("../controllers/invcontroller");

const inventoryRouter = Router();

inventoryRouter.get("/", routesController.homeRender);
inventoryRouter.get("/categories", routesController.getCategories);

module.exports = inventoryRouter;
