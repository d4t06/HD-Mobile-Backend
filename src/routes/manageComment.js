// **** PATH /api/product-comment-management

const express = require("express");
const router = express.Router();

const ProductCommentController = require("../controllers/ProductCommentController");

router.get("/comments", ProductCommentController.getAllComments);

router.delete("/comments/:id", ProductCommentController.delete);

router.post("/replies", ProductCommentController.addReply);

router.put("/replies/:id", ProductCommentController.editReply);

module.exports = router;
