// **** PATH /api/sliders

const express = require("express");
const router = express.Router();

const SliderController = require("../controllers/SliderController");

// push to admin route later
router.get("/category_sliders", SliderController.getAllCategorySlider);

router.get("/category_sliders/:category_ascii", SliderController.getCategorySlider);

module.exports = router;
