const express = require("express");
const couresController = require("../app/controllers/CouresController");
const route = express.Router();

route.use("/create", couresController.create);
route.use("/:slug", couresController.show);
route.use("/", couresController.index);

module.exports = route;
