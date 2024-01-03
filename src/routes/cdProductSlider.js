// **** PATH /api/product-slider-management

const express = require("express");
const router = express.Router();

const CDProductSlider = require("../controllers/CDProductSlider");

router.post("/product-sliders", CDProductSlider.add);

router.delete("/product-sliders/:id", CDProductSlider.delete);

module.exports = router;
