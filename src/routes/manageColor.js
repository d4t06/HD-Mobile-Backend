// **** PATH /api/color-management

const express = require("express");
const router = express.Router();

const ColorController = require("../controllers/ColorController");

router.post("/colors", ColorController.add);
router.put("/colors/:id", ColorController.updateOne);
router.delete("/colors/:id", ColorController.delete);

module.exports = router;
