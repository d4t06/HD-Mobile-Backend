const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/AuthController");
const LogoutController = require("../controllers/LogoutController");

const tokenMiddleware = require("../middleWares/tokenMiddleware");

// router.get("/", (req, res) => {
// 	res.json("login")
// })

router.post("/login", AuthController.handleLogin);

router.post("/register", AuthController.handleRegister);

router.get("/logout", LogoutController.handleLogout);

module.exports = router;
