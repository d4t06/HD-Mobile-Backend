// **** PATH /api/carts

const express = require("express");
const router = express.Router();

const CartController = require("../controllers/CartController");

router.post("/", CartController.addNewCart);
router.get("/:username", CartController.getCartDetail);

router.post("/cart-items", CartController.addCartItem);
router.put("/cart-items/:id", CartController.updateCartItem);
router.delete("/cart-items/:id", CartController.deleteCartItem);

module.exports = router;
