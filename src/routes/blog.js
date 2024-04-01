const express = require("express")
const {blogProfile, createBlog, viewMyBlogs, viewBlog, deleteBlog, updateBlog} = require("../controllers/blog")
const authenticateToken = require("../middleware/tokenAuth")

const router = express.Router()

router.route("/").get(authenticateToken, blogProfile);
router.route("/create").post(authenticateToken, createBlog);
router.route("/myBlogs").get(authenticateToken, viewMyBlogs);
router.route("/:blogId").get(authenticateToken, viewBlog);
router.route("/delete/:blogId").delete(authenticateToken, deleteBlog);
router.route("/update/:blogId").put(authenticateToken, updateBlog);

module.exports = router