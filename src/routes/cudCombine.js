// **** PATH /api/combine-management

const express = require("express");
const router = express.Router();

const CUDCombineController = require("../controllers/CUDCombineController");

router.post("/combines", CUDCombineController.add);

router.delete("/combines/:id", CUDCombineController.delete);

router.put("/combines/:id", CUDCombineController.updateOne);

module.exports = router;
