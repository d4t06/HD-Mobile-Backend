const { application } = require("express");
const express = require("express");
const route = express.Router();
// controller
const productsController = require("../controllers/ProductsController");
// middle
// const paginationMiddleware = require("../middleWares/paginationMiddleware");
const sortMiddleware = require("../middleWares/sortMiddleware");

route.get("/", sortMiddleware, productsController.index);

route.post("/", productsController.buy);

route.get("/search", sortMiddleware, productsController.search);

route.get("/:category/:key", productsController.getOne);

// route.get("/laptop/:key", productsController.getByKey);

module.exports = route;
