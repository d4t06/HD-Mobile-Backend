// *** PATH api/search

const express = require("express");
const router = express.Router();

const SearchController = require("../controllers/SearchController");
const sortMiddleware = require("../middleWares/sortMiddleware");

router.use(sortMiddleware);

router.get("/", SearchController.search);

module.exports = router;
