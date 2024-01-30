// **** PATH /api/order-management

const express = require("express");
const router = express.Router();

const OrderController = require("../controllers/OrderController");
const ManageOrderController = require("../controllers/ManageOrderController");
const orderStatus = require("../middleWares/orderStatus");

router.use(orderStatus);
router.get("/orders", ManageOrderController.getAllOrders);
router.put("/", OrderController.updateOrderStatus);

module.exports = router;
