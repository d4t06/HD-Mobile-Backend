const express = require("express");
const router = express.Router();
// controller
const userController = require("../controllers/UserController");

router.get("/user", userController.index);

module.exports = router;
