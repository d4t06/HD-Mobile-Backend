const express = require("express");
const router = express.Router();
// controller
const RefreshTokenController = require("../controllers/RefreshTokenController");

router.post("/", RefreshTokenController.handleRefreshToken);

module.exports = router;
