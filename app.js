const express = require("express");
const expressLayouts = require("express-ejs-layouts"); //prevents us having to duplicate code in ejs
const fileUpload = require("express-fileupload");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const cors = require('cors')
const app = express();
const port = process.env.PORT || 3000;
app.use(cors());

require("dotenv").config();
app.use(fileUpload());
app.use(flash());
app.use(express.urlencoded({ extended: true })); // helps us pass url data to ejs
app.use(express.json());
app.use(express.static("public")); // hosts public fiels like html and css or main.js
app.use(expressLayouts);

app.use(cookieParser("EmotionBlogSecure"));

app.use(
  session({
    secret: "EmotionBlogSecretSession",
    saveUninitialized: true,
    resave: true,
  })
);

app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

const routes = require("./server/routes/emotionsRoutes.js");

app.use("/", routes);
app.listen(port, () => console.log(`listening to port $`));
