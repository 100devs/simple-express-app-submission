const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require('../models/user')
const bcrypt = require('bcryptjs')

exports.localStrategy = passport.use(
    new LocalStrategy((username, password, done) => {
      User.findOne({ username: username }, (err, user) => {
        if (err) { 
          return done(err);
        }
        if (!user) {
          return done(null, false, { message: "Incorrect username" });
        }
        bcrypt.compare(password, user.password, (err, res) => {
          if (res) {
            // passwords match! log user in
            return done(null, user)
          } else {
            // passwords do not match!
            return done(null, false, { message: "Incorrect password" })
          }
        })     
      });
    })
);

exports.serializeUser = passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

exports.deserializeUser = passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

exports.checkAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) { return next() }
    res.redirect("/login")
}
  