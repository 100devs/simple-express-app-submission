const express = require('express')
const app = express()
const router = express.Router()
const passport = require('passport')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const { checkAuthenticated } = require('../passport-config')
const { checkNotAuthenticated } = require('../passport-config')

//GET home page (index.ejs)
router.get('/', async (request, response)=>{

    //render the index.ejs file
    response.render('index.ejs', { title: 'Skillet List | Home' })
})

//GET sign-up page
router.get('/sign-up', checkNotAuthenticated, async (request, response)=>{

    //render the sign-up.ejs file
    response.render('sign-up.ejs', { title: 'Skillet List | Sign up' })
})

//GET login page
router.get('/login', checkNotAuthenticated, async (request, response)=>{

    //render the login.ejs file
    response.render('login.ejs', { title: 'Skillet List | Login' })
})

//POST to /sign-up to create an account
router.post('/sign-up', checkNotAuthenticated, async (request, response) => {
    try {
        const hashedPassword = await bcrypt.hash(request.body.password, 10)
        await User.create({
            email: request.body.email, 
            password: hashedPassword
        })
        console.log('User added')
        response.redirect('/login')
    } catch(err) {
        console.log(err)
        response.render('sign-up.ejs', {title: 'Skillet List | Sign up', errorMessage: 'Error: Please try again.'})
    }
})

//POST to login/authenticate a user
router.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    failureRedirect: '/login', 
    failureFlash: true
}), function (request, response) {
    response.redirect(`users/${request.user._id}/dashboard`)
})

//Handle DELETE requests to the /logout route - to logout/deauthenticate a use
//Custom middleware in server.js handles overriding the link's GET method
router.delete('/logout', checkAuthenticated, async (request, response)=>{
    request.logOut(err => {
        if (err) { return next(err)}
    })
    response.redirect('/')
})

module.exports = router