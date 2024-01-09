// **** PATH /api/slider-management

const express = require("express");
const router = express.Router();

const CUDSliderController = require("../controllers/CUDSliderController");
const roleMiddleware = require('../middleWares/roleMiddleware')
const tokenMiddleware = require('../middleWares/tokenMiddleware')

router.get("/category_sliders", CUDSliderController.getAllCategorySlider);

router.get("/category_sliders/:category_ascii", CUDSliderController.getCategorySlider);

router.use(tokenMiddleware)
router.use(roleMiddleware.isAdmin)

router.post("/product-sliders", CUDSliderController.addProductSlider);

router.post("/category_sliders", CUDSliderController.addCategorySlider);

router.post("/sliders", CUDSliderController.addSlider);

router.post("/sliders/images", CUDSliderController.addImages);

router.delete("/sliders/images/:id", CUDSliderController.deleteImage);

router.delete("/sliders/:id", CUDSliderController.deleteSlider);

module.exports = router;
