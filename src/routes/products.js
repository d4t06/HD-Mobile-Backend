const {application} = require("express");
const express = require("express");
const route = express.Router();
// controller
const productsController = require("../controllers/ProductsController");
// middle
const paginationMiddleware = require("../middleWares/paginationMiddleware");

route.get("/", paginationMiddleware, productsController.index);

route.get("/:category/:key", productsController.getProducts);

// route.get("/laptop/:key", productsController.getByKey);


route.get("/", (res, req) => {
   req.json("products");
});

module.exports = route;
