// **** PATH /api/product-management

const express = require("express");
const router = express.Router();

const ManageProductController = require("../controllers/ManageProductController");
const ProductController = require("../controllers/ProductController");
const ColorController = require("../controllers/ColorController");
const CombineController = require("../controllers/CombineController");
const ProductDetailController = require("../controllers/ProductDetailController");
const StorageController = require("../controllers/StorageController");
const SliderController = require("../controllers/SliderController");

const tokenMiddleware = require("../middleWares/tokenMiddleware");
const roleMiddleware = require("../middleWares/roleMiddleware");


router.get("/products", ManageProductController.getAll);
router.get("/products/:id", ProductController.getDetail);

router.use(tokenMiddleware);
router.use(roleMiddleware.isAdmin);

// *** /products
router.post("/products", ManageProductController.addOne);
router.put("/products/:id", ManageProductController.updateOne);
router.delete("/products/:id", ManageProductController.deleteOne);

// ** /attributes
router.post("/attributes", ManageProductController.addManyAttribute);
router.put("/attributes/:id", ManageProductController.updateOneAttribute);

// ** /sliders
router.post("/product-sliders", SliderController.addProductSlider);

// ** /colors
router.post("/colors", ColorController.add);
router.put("/colors/:id", ColorController.updateOne);
router.delete("/colors/:id", ColorController.delete);

// ** /combines
router.post("/combines", CombineController.add);
router.delete("/combines/:id", CombineController.delete);
router.put("/combines/:id", CombineController.updateOne);

// ** /details
router.post("/", ProductDetailController.add);
router.put("/:id", ProductDetailController.update);

// ** /storages
router.post("/storages", StorageController.add);
router.delete("/storages/:id", StorageController.delete);
router.put("/storages/:id", StorageController.updateOne);



module.exports = router;
