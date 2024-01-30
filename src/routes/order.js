// **** PATH /api/orders

const express = require("express");
const router = express.Router();

const OrderController = require("../controllers/OrderController");
const orderStatusMiddleware = require("../middleWares/updateOrderStatus");

router.post("/", OrderController.addNewOrder);
router.get("/", OrderController.getAllUserOrder);
router.get("/:id", OrderController.getOrderDetail);

router.post("/order-items", OrderController.addOrderItem);

router.use(orderStatusMiddleware);
router.put("/", OrderController.updateOrderStatus);

module.exports = router;
