const { Router } = require("express");
const routesController = require("../controllers/invcontroller");

const inventoryRouter = Router();

inventoryRouter.get("/", routesController.homeRender);

module.exports = inventoryRouter;
