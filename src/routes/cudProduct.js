// **** PATH /api/product-management

const express = require("express");
const router = express.Router();

const CUDProductController = require("../controllers/CUDProductController");
const ProductsController = require("../controllers/ProductsController");

router.get("/products", CUDProductController.getAll);
router.get("/products/:id", ProductsController.getDetail);

router.post("/products", CUDProductController.addOne);
router.put("/products", CUDProductController.updateOne);

router.delete("/products/:id", CUDProductController.deleteOne);

module.exports = router;
