// **** PATH /api/slider-management

const express = require("express");
const router = express.Router();

const SliderController = require("../controllers/SliderController");
const roleMiddleware = require("../middleWares/roleMiddleware");
const tokenMiddleware = require("../middleWares/tokenMiddleware");

router.use(tokenMiddleware);
router.use(roleMiddleware.isAdmin);

router.post("/sliders", SliderController.addSlider);
router.post("/sliders/images", SliderController.addImages);
router.delete("/sliders/images/:id", SliderController.deleteImage);
router.delete("/sliders/:id", SliderController.deleteSlider);

module.exports = router;
