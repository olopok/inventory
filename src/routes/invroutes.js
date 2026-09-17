const { Router } = require("express");
const routesController = require("../controllers/invcontroller");

const inventoryRouter = Router();

inventoryRouter.get("/", routesController.homeRender);
inventoryRouter.get("/categories", routesController.getCategories);
inventoryRouter.get("/category/:id", routesController.getCategoryItems);
inventoryRouter.get("/products", routesController.getProducts);
inventoryRouter.get("/editdata", routesController.getInventory);

inventoryRouter.post("/editdata", routesController.createCategoryPost);
inventoryRouter.post("/editdata/products", routesController.newProduct);
inventoryRouter.post(
  "/delete/products/:id",
  routesController.deleteProductPost,
);
inventoryRouter.post(
  "/editdata/products/:id",
  routesController.editProductPost,
);
inventoryRouter.post("/editdata/:id", routesController.editCategoryPost);

inventoryRouter.post("/delete/:id", routesController.deleteCategoryPost);

module.exports = inventoryRouter;
