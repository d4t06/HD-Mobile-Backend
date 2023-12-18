const { application } = require("express");
const express = require("express");
const router = express.Router();
// controller
const productsController = require("../controllers/ProductsController");

const paginationMiddleware = require("../middleWares/paginationMiddleware");
const sortMiddleware = require("../middleWares/sortMiddleware");

router.get("/:category/:id", productsController.getDetail);

// router.use(paginationMiddleware);
router.use(sortMiddleware);

router.get("/search", productsController.search);

router.get("/:category", productsController.getProducts);

module.exports = router;
