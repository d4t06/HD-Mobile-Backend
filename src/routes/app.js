// *** PATH /api/app

const express = require("express");
const router = express.Router();
// controller
const AppController = require("../controllers/AppController");
const SliderController = require("../controllers/SliderController");

router.get("/categories", AppController.getAllCategory);

router.get("/category-sliders", SliderController.getCategorySlider);

router.get("/category-attributes", AppController.getCategoryAttributes);

router.get("/category-prices", AppController.getCategoryPrices);

router.get("/brands", AppController.getAllBrand);

module.exports = router;
