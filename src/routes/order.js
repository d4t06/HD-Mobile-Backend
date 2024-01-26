// **** PATH /api/orders

const express = require("express");
const router = express.Router();

const OrderController = require("../controllers/OrderController");

router.post("/", OrderController.addNewOrder);
router.get("/", OrderController.getAllUserOrder);
router.get("/:id", OrderController.getOrderDetail);

router.post("/order-items", OrderController.addOrderItem);

module.exports = router;
