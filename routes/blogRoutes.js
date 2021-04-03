const express = require("express");
const blogController = require('../controllers/blogController')

const router = express.Router();

router.get("/", blogController.blog_index);

router.get("/create", blogController.blog_create_get);

router.post("/", blogController.blog_create_post);

router.get("/:id", blogController.blog_details)

router.get('/update/:id', blogController.blog_update_page)

router.post('/update-blog/:id', blogController.blog_update_blog)

router.delete("/:id", blogController.blog_delete);

module.exports = router;
