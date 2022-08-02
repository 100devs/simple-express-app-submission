const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('./models/User')
const bcrypt = require('bcrypt')

exports.localStrategy = passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
        User.findOne({email: email}, (err, user) => {
            if (err) {
                return done(err)
            }
            if (!user) {
                return done(null, false, {message: 'No user with that email.'})
            }
            bcrypt.compare(password, user.password, (err, response) => {
                if (response) {
                    //passwords match! user logins 
                    return done(null, user)
                } else {
                    //passwords do not match 
                    return done(null, false, {message: 'Incorrect password'})
                }
            })
        })
    })
)

exports.serializeUser = passport.serializeUser(function(user, done) {
    done(null, user.id)
})

exports.deserializeUser = passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
    done(err, user)
    })
})

exports.checkAuthenticated = (request, response, next) => {
    if (request.isAuthenticated()) { 
        return next() 
    }
    response.redirect('/login')
}

exports.checkNotAuthenticated = (request, response, next) => {
    if (request.isAuthenticated()) { 
        return response.redirect(`users/${request.user._id}/dashboard`)
    }
    next()
}
