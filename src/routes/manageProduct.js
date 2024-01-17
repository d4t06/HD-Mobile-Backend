// **** PATH /api/product-management

const express = require("express");
const router = express.Router();

const ManageProductController = require("../controllers/ManageProductController");
const ProductController = require("../controllers/ProductController");

const tokenMiddleware = require("../middleWares/tokenMiddleware");
const roleMiddleware = require("../middleWares/roleMiddleware");


router.get("/products", ManageProductController.getAll);
router.get("/products/:id", ProductController.getDetail);

router.use(tokenMiddleware);
router.use(roleMiddleware.isAdmin);

router.post("/products", ManageProductController.addOne);
router.put("/products", ManageProductController.updateOne);

router.delete("/products/:id", ManageProductController.deleteOne);

module.exports = router;
