const Blog = require("../models/blog");

const blog_index = (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { title: "All Bloogs", blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
};

const blog_details = (req, res) => {
  const id = req.params.id;
  console.log(id);
  Blog.findById(id)
    .then((result) =>
      res.render("details", { blog: result, title: result.title })
    )
    .catch((err) => {
      console.log(err);
    });
};

const blog_create_get = (req, res) => {
     res.render("create", { title: "Make a New Bloog" });
}

const blog_create_post = (req, res) => {
    const blog = new Blog(req.body);
  blog
    .save()
    .then((result) => {
      res.redirect("/blogs");
    })
    .catch((err) => {
      console.log(err);
    });
}

const blog_delete = (req, res) => {
    const id = req.params.id;

  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/blogs" });
    })
    .catch((err) => {
      console.log(err);
    });
}

const blog_update_page = (req, res) => {
  const id = req.params.id
  Blog.findById(id)
  .then( (result) => {
  res.render('update.ejs', {title: result.title, blog: result})
  }) 
}

const blog_update_blog = (req, res) => {
  const id = req.params.id
  Blog.findByIdAndUpdate(id, req.body, {returnOriginal: false, useFindAndModify: false} )
  .then( () => {
    Blog.findById(id)
    .then((result) =>
      res.render("details", { blog: result, title: "BLOOG" })
    )
    .catch((err) => {
      console.log(err);
    });
  })
}

module.exports = {
  blog_index,
  blog_details,
  blog_create_get,
  blog_create_post,
  blog_delete,
  blog_update_page,
  blog_update_blog,
};
