// **** PATH /api/combine-management

const express = require("express");
const router = express.Router();

const CombineController = require("../controllers/CombineController");

router.post("/combines", CombineController.add);

router.delete("/combines/:id", CombineController.delete);

router.put("/combines/:id", CombineController.updateOne);

module.exports = router;
