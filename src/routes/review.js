// **** PATH /api/product-reviews

const express = require("express");
const router = express.Router();

const ProductReviewController = require("../controllers/ProductReviewController");

router.get("/:id", ProductReviewController.getProductReviewsClient);

router.get("/avg/:id", ProductReviewController.getAverage);

router.post("/like", ProductReviewController.like);

router.post("/", ProductReviewController.add);

module.exports = router;
