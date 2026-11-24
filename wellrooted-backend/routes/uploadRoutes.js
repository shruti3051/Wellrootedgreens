const express = require("express");

const upload = require("../middleware/uploadMiddleware");

const { uploadProductImage } = require("../controllers/uploadController");

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const router = express.Router();

router.post(
  "/product-image",
  protect,
  adminOnly,
  upload.single("image"),
  uploadProductImage,
);

module.exports = router;
