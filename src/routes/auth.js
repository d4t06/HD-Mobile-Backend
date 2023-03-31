const express = require("express");
const router = express.Router();

const AuthController = require("../controllers/AuthController");
const LogoutController = require("../controllers/LogoutController");
const RefreshTokenController = require("../controllers/RefreshTokenController");

router.post("/login", AuthController.handleLogin);

router.post("/register", AuthController.handleRegister);

router.get("/logout", LogoutController.handleLogout);

router.get("/refresh", RefreshTokenController.handleRefreshToken);

module.exports = router;
