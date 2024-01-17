// **** PATH /api/product-attribute-management

const express = require("express");
const router = express.Router();

const ProductAttributeController = require("../controllers/ProductAttributeController");

router.post("/", ProductAttributeController.addMany);
router.put("/:id", ProductAttributeController.updateOne);

module.exports = router;
