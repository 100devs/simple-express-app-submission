const express = require("express");
const router = express.Router();
// protect routes with middle ware
const { ensureAuth, ensureGuest } = require("../middleware/auth");

const Book = require("../models/Book");
const { formatDate } = require("../helpers/ejs");

// if the user is not logged in show him/her the login page and they cannot go to dashboard without loggin in
// change the flow so now the user will go to public books without login
router.get("/", (request, response) => {
  response.redirect("/books");
});

// Login page
router.get("/login", ensureGuest, (request, response) => {
  response.render("pages/login.ejs");
});

// if the user logged in show him/her the dashboard instead and they cannot go to login page
router.get("/dashboard", ensureAuth, async (request, response) => {
  try {
    // lean get the data as plain object without the ability to edit or any other methods on mongoose document
    const books = await Book.find({ user: request.user.id }).lean();
    response.render("pages/dashboard.ejs", {
      user: request.user,
      books: books,
      formatDate: formatDate,
    });
  } catch (error) {
    console.error(error);
    res.render("error/500");
  }
});

module.exports = router;
