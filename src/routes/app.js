// *** PATH /api/app

const express = require("express");
const router = express.Router();
// controller
const AppController = require("../controllers/AppController");

router.get("/categories", AppController.getAllCategory);
   router.delete("/categories/:id", AppController.deleteCategory);

   router.post("/categories", AppController.addCategory);
   router.put("/categories/:id", AppController.updateCategory);

   router.get("/category-attributes/:id", AppController.getCategoryAttributes);
router.post("/category-attributes", AppController.addAttribute);
router.put("/category-attributes/:id", AppController.updateAttribute);
router.delete("/category-attributes/:id", AppController.deleteAttribute);

router.get("/brands", AppController.getAllBrand);
router.delete("/brands/:id", AppController.deleteBrand);

router.post("/brands", AppController.addBrand);
router.put("/brands/:id", AppController.updateBrand);

module.exports = router;
