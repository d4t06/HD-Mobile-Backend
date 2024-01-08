// *** PATH /api/image-management

const express = require("express");
const router = express.Router();
const multer = require("multer");

const ImageController = require("../controllers/ImageController");

// const TokenVerify = require("../middlewares/TokenVerify");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// router.use(TokenVerify)

router.get("/images", ImageController.getImages);

router.post("/images", upload.single("image"), ImageController.addOne);

router.delete("/images/:id", ImageController.deleteOne);
// upload.single("image") image == field in input

module.exports = router;
