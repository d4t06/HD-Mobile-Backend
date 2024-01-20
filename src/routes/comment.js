// **** PATH /api/product-comments

const express = require("express");
const router = express.Router();

const ProductCommentController = require("../controllers/ProductCommentController");

router.get("/:id", ProductCommentController.getProductCommentsClient);

router.post("/like", ProductCommentController.likeComment);

router.post("/unlike", ProductCommentController.unLikeComment);

router.post("/", ProductCommentController.addComment);

module.exports = router;
