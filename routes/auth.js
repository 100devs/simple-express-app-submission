const express = require("express");
const passport = require("passport");
const router = express.Router();

// Auth with google (GET /auth/google)
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));
// google auth callback (GET /auth/google/callback)
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/dashboard");
  }
);
// logout user (GET /auth/logout)
router.get("/logout", (req, res) => {
  // from passport middle ware when login we have the logout in the req automatically
  req.logOut((err) => {
    if (err) {
      console.error(err);
    }
    res.redirect("/");
  });
});

module.exports = router;
