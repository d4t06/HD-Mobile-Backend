const express = require("express");
const AuthController = require("../controllers/AuthController");
const router = express.Router();

// router.get("/", (req, res) => {
// 	res.json("login")
// })

router.post("/login", AuthController.handleLogin);

router.post("/register", AuthController.handleRegister);

module.exports = router;
