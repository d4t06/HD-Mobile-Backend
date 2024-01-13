// **** PATH /api/product-comment-management

const express = require("express");
const router = express.Router();

const ProductCommentController = require("../controllers/ProductCommentController");
const tokenMiddleware = require("../middleWares/tokenMiddleware");
const roleMiddleware = require("../middleWares/roleMiddleware");

router.post("/comments", ProductCommentController.addComment);

router.use(tokenMiddleware);
router.use(roleMiddleware.isAdmin);

router.post("/replies", ProductCommentController.addReply);

module.exports = router;
