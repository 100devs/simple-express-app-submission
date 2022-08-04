const Blog = require("../models/blog");

const blog_index = (req, res) => {
    // res.render("blogs/index", { title: "Home", blogs });
    Blog.find()
        .sort({ createdAt: -1 })
        .then((result) =>
            res.render("blogs/index", { title: "All Blogs", blogs: result })
        )
        .catch((error) => console.log(error));
};

const blog_details = (req, res) => {
    const id = req.params.id;

    Blog.findById(id)
        .then((result) =>
            res.render("blogs/details", {
                blog: result,
                title: "Blog Deatils",
            })
        )
        .catch((error) => {
            res.status(404).render("404", { title: "Blog Not Found." });
        });
};

const blog_create_get = (req, res) => {
    res.render("blogs/create", { title: "New Blog" });
};

const blog_create_post = (req, res) => {
    const newBlog = new Blog(req.body);
    newBlog
        .save()
        .then((result) => {
            // console.log(result);
            res.redirect("/blogs");
        })
        .catch((error) => console.log(error));
};

const blog_delete = (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
        .then((result) => {
            res.json({ redirect: "/blogs" });
        })
        .catch((error) => console.log(error));
};

const blog_snippet_put = (req, res) => {
    const id = req.params.id;
    console.log(req.body);
    Blog.findByIdAndUpdate(id, { $set: req.body })
        .then((result) => {
            res.json({ redirect: `/blogs/${id}` });
        })
        .catch((error) => console.log(error));
};

module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete,
    blog_snippet_put,
};
