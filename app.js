const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const methodOverride = require("method-override");
const connectDB = require("./config/db");

// attach the config file with dotenv
dotenv.config({ path: "./config/config.env" });

// Passport config (passing poassport as a parameter)
require("./config/passport")(passport);

connectDB();
const app = express();

// middlewares
app.set("view engine", "ejs");
app.use(express.static("public"));

// Body parser (receive data from the form)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// use the methodOverride to have the ability to DELETE and PUT reuquests in the form
// it receive the POST request and remove the POST request and replace it with the _method that came from the form like "PUT"
app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === "object" && "_method" in req.body) {
      // look in urlencoded POST bodies and delete it
      var method = req.body._method;
      delete req.body._method;
      return method;
    }
  })
);

// sessions (from express-session)
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_CONNECTION }),
  })
);
// initialize passport
app.use(passport.initialize());
// already installed with the dependencies
app.use(passport.session());

// log any request to the console
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const PORT = process.env.PORT || 3000;

// Routes
app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/auth"));
app.use("/books", require("./routes/books"));

app.listen(
  PORT,
  console.log(
    `server listening in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);
