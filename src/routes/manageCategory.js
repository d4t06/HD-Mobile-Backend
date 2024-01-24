// *** PATH /api/category-management

const express = require("express");
const router = express.Router();

// controller
const CategoryController = require("../controllers/CategoryController");
const BranController = require("../controllers/BrandController");
const CategoryAttributeController = require("../controllers/CategoryAttributeController");
const CategoryPriceController = require("../controllers/CategoryPriceController");
const SliderController = require("../controllers/SliderController");

// *** /categories
router.get("/categories", CategoryController.getAllCategory);
router.delete("/categories/:id", CategoryController.deleteCategory);
router.post("/categories", CategoryController.addCategory);
router.put("/categories/:id", CategoryController.updateCategory);

// ** /sliders
router.get("/category-sliders", SliderController.getAllCategorySlider);
router.post("/category-sliders", SliderController.addCategorySlider);

// *** /brands
router.post("/brands", BranController.addBrand);
router.delete("/brands/:id", BranController.deleteBrand);
router.put("/brands/:id", BranController.updateBrand);

// *** /attributes
router.post("/attributes", CategoryAttributeController.addAttribute);
router.put("/attributes/:id", CategoryAttributeController.updateAttribute);
router.delete("/attributes/:id", CategoryAttributeController.deleteAttribute);

//  *** /price-ranges
router.post("/price-ranges", CategoryPriceController.addOnePriceRange);
router.put("/price-ranges/:id", CategoryPriceController.updatePriceRange);
router.delete("/price-ranges/:id", CategoryPriceController.deletePriceRange);

module.exports = router;
