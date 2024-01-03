// **** PATH /api/slider-management

const express = require("express");
const router = express.Router();

const CUDSliderController = require("../controllers/CUDSliderController");

router.post("/sliders", CUDSliderController.add);

router.post("/sliders/images", CUDSliderController.addImages);

router.delete("/slider/:id", CUDSliderController.delete);

module.exports = router;
