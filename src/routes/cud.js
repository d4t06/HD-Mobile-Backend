const express = require("express");
const router = express.Router();

const CUDController = require("../controllers/CUDController");
const ProductsController = require("../controllers/ProductsController");

const tokenMiddleware = require("../middleWares/tokenMiddleware");
const roleMiddleware = require("../middleWares/roleMiddleware");

// router.use(tokenMiddleware);

router.get("/:id", ProductsController.getDetail);

// *** admin role
// router.use(roleMiddleware.isAdmin)

router.post("/", CUDController.addOne);

router.get("/delete/:id", CUDController.deleteOne);

router.post("/update", CUDController.updateOne);

module.exports = router;
