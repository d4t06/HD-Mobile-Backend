const express = require("express");
const router = express.Router();
// controller
const RefreshTokenController = require("../controllers/RefreshTokenController");

router.get("/", RefreshTokenController.handleRefreshToken);

module.exports = router;
