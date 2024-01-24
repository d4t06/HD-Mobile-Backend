// *** PATH /api/products

const express = require("express");
const router = express.Router();
// controller
const ProductController = require("../controllers/ProductController");
const sortMiddleware = require("../middleWares/sortMiddleware");

router.get("/:id", ProductController.getDetail);

router.use(sortMiddleware);
// router.use(paginationMiddleware);
router.get("/", ProductController.getProducts);

module.exports = router;
