// **** PATH /api/color-management

const express = require("express");
const router = express.Router();

const CUDColorController = require("../controllers/CUDColorController");

router.post("/colors", CUDColorController.add);
router.put("/colors/:id", CUDColorController.updateOne);
router.delete("/colors/:id", CUDColorController.delete);

module.exports = router;
