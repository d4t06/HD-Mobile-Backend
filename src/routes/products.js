// *** PATH /api/products

const express = require("express");
const router = express.Router();
// controller
const productsController = require("../controllers/ProductsController");

// const paginationMiddleware = require("../middleWares/paginationMiddleware");
const sortMiddleware = require("../middleWares/sortMiddleware");

router.get("/:id", productsController.getDetail);

router.use(sortMiddleware);
router.get("/", productsController.getProducts);

// router.get("/search", productsController.search);
// router.use(paginationMiddleware);

module.exports = router;
