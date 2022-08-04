const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

const blogRoutes = require("./routes/blogRoutes");

require("dotenv/config");

const app = express();

const PORT = process.env.PORT || 7000;
const connectionString = process.env.DB_STRING;

mongoose
    .connect(connectionString)
    .then((result) => {
        console.log("Connected to Database");
        app.listen(process.env.PORT || PORT, () =>
            console.log(`Server listening on port ${PORT}`)
        );
    })
    .catch((err) => {
        console.log(err);
    });

// let blogs = [
//     {
//         title: "Node.js",
//         snippet: "Hello Node.js",
//         body: "Body of Node.js",
//     },
//     {
//         title: "Express.js",
//         snippet: "Hello Express.js",
//         body: "Body of Express.js",
//     },
//     {
//         title: "MongoDB",
//         snippet: "Hello MongoDB",
//         body: "Body of MongoDB",
//     },
// ];

// app.get("/add-blog", (req, res) => {
//   const newBlog = new Blog({
//     title: "MongoDB",
//     snippet: "Hello MongoDB",
//     body: "Body of MongoDB",
//   });
//   newBlog
//     .save()
//     .then((result) => res.send(result))
//    // .then((result) => res.send("New blog added."))
//     .catch((err) => console.log(err));
// });

// app.get("/all-blogs", (req, res) => {
//   Blog.find()
//     .then((result) => res.send(result))
//     .catch((err) => console.log(err));
// });

// app.get("/specific-blog", (req, res) => {
//   Blog.findById("62a4f539094bdcad2eea97b2")
//     .then((result) => res.send(result))
//     .catch((err) => console.log(err));
// });

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use("/blogs", blogRoutes);

app.get("/", (req, res) => res.redirect("/blogs"));

app.get("/about", (req, res) => {
    res.render("about", { title: "About" });
});

app.get("/about-us", (req, res) => {
    res.redirect("/about");
});

app.use((req, res) => {
    res.status(404).render("404", { title: "Error" });
});
