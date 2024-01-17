// **** PATH /api/product-reviews-management

const express = require("express");
const router = express.Router();

const ProductReviewController = require("../controllers/ProductReviewController");

router.get("/", ProductReviewController.getAllReviews);

router.post("/replies", ProductReviewController.rely);

router.post("/approve", ProductReviewController.approve);

router.delete("/:id", ProductReviewController.delete);

module.exports = router;
