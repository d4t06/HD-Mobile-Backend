// **** PATH /api/product-detail-management

const express = require("express");
const router = express.Router();

const ProductDeatailController = require("../controllers/ProductDetailController");

router.post("/", ProductDeatailController.add);
router.put("/:id", ProductDeatailController.update);

module.exports = router;
