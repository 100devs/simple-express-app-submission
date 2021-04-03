//EXPRESS
const express = require("express");
const app = express();
const blogRoutes = require('./routes/blogRoutes')
//MONGOOSE
const mongoose = require("mongoose");

//MORGAN
const morgan = require("morgan");
//REGISTER VIEW ENGINE
app.set("view engine", "ejs");

const dbURL =
  "mongodb+srv://Wolf:fafa@serverfun.fxlgs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose
  .connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(5000))
  .catch((err) => console.log(err));

//MIDDLEWARE
//STATIC FILES
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}))
//MORGAN
app.use(morgan("dev"));
// mongoose return original set to false
mongoose.set('returnOriginal', false);
//REQUESTS
app.get("/", (req, res) => {
    //will make a stand-alone home page in future
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

//Blog Routes
app.use('/blogs', blogRoutes)

//REDIRECT
app.get("/about-us", (req, res) => {
  res.redirect("/about");
});
//ERROR PAGE
app.use((req, res) => {
  res.status(404).render("404", { title: "444444" });
});
