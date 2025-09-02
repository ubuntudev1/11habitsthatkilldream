const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");

router.get("/", blogController.getIndex);
router.get("/buy-copy", blogController.getCopy);
router.get("/blog", blogController.getAllBlogs);
router.get("/blog/:id", blogController.getBlogById);
router.get("/upload-blog", blogController.getUploadPage);
router.post("/upload-blog", blogController.createBlog);
router.post("/order", blogController.postOrder);
module.exports = router;
