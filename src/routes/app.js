const express = require("express");
const router = express.Router();
// controller
const AppController = require("../controllers/AppController");

router.get("/category", AppController.getAllCategory);
router.get("/brand", AppController.getAllBrand);

module.exports = router;
