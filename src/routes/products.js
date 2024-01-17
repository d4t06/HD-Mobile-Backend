// *** PATH /api/products

const express = require("express");
const router = express.Router();
// controller
const ProductController = require("../controllers/ProductController");

// const paginationMiddleware = require("../middleWares/paginationMiddleware");
const sortMiddleware = require("../middleWares/sortMiddleware");

router.get("/:id", ProductController.getDetail);

router.use(sortMiddleware);
router.get("/", ProductController.getProducts);

// router.get("/search", ProductController.search);
// router.use(paginationMiddleware);

module.exports = router;
