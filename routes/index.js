const express = require('express')
const router = express.Router()
const Plant = require('../models/plant')
const { createManyImageTags } = require('../utils/cloudinaryFunctions')
const User = require('../models/user')
const passport = require('passport')
const bcrypt = require('bcryptjs')
const flash = require('connect-flash');  
const app = express()

app.use(flash())

router.get('/', async (req, res) => {
    try {
        const plants = await Plant.aggregate([
            {$sample: {size: 4}}
        ], function (err, docs) {
            return docs
        })
        const plantsImageTags = await createManyImageTags(plants)

        res.render('index', { plants: plants, plantsImageTags: plantsImageTags })
    } catch (err) {
        res.render('index', { plants: [], plantsImageTags: [] })
    }
});

router.get("/register", (req, res) => {
    const errorMessage = req.flash('error')
    if (!req.user) {
        res.render("users/register", { errorMessage })
    } else {
        res.redirect(`users/${req.user._id}/dashboard`)
    }
});

router.get("/login", (req, res) => {
    if (!req.session.messages) req.session.messages = []
    if (!req.user) {
        res.render("users/login", {messages: req.session.messages})
    } else {
        res.redirect(`users/${req.user._id}/dashboard`)
    }
});

router.get("/admin", (req, res) => res.render("users/admin"));

router.post("/register/", (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
        if (err) {
            req.flash('error', 'Registration failed. Try again.')
            res.status(500).send()                        
        } else {
            const user = new User({
                username: req.body.username,
                password: hashedPassword
                }).save(err => {
                    if (err) { 
                        req.flash('error', 'There is already a user with that email address. Try again.')
                        res.status(500).send()                        
                    } else {
                        res.redirect("/login");
                    }
            });
        }
    }) 
});


router.post(
    "/login",
    passport.authenticate('local', { failureRedirect: '/login', failureMessage: true }),
    function(req, res) {
      res.redirect('/users/' + req.user._id + '/dashboard');
    }
);

router.get("/logout", (req, res) => {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  });



module.exports = router;