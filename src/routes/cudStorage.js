// **** PATH /api/storage-management

const express = require("express");
const router = express.Router();

const CUDStorageController = require("../controllers/CUDStorageController");

router.post("/storages", CUDStorageController.add);

router.delete("/storages/:id", CUDStorageController.delete);

router.put("/storages/:id", CUDStorageController.updateOne);

module.exports = router;
