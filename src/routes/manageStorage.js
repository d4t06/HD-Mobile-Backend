// **** PATH /api/storage-management

const express = require("express");
const router = express.Router();

const StorageController = require("../controllers/StorageController");

router.post("/storages", StorageController.add);

router.delete("/storages/:id", StorageController.delete);

router.put("/storages/:id", StorageController.updateOne);

module.exports = router;

