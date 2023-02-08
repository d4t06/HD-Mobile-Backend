const express = require("express");
const productsController = require("../controllers/ProductsController");
const route = express.Router();

route.get("/products/:key", productsController.getOne);
route.get("/products", productsController.index);
route.get("/", productsController.index);

module.exports = route;
