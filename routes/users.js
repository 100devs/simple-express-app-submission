const express = require('express')
const router = express.Router()
const Dish = require('../models/Dish')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const { checkAuthenticated } = require('../passport-config')

//Handle GET (READ) requests for the individual user dashboard
router.get('/:id/dashboard', checkAuthenticated, async (request, response) => {

    const user = await User.findById(request.params.id)

    // query the database to find all the dishes documents for THIS USER
    const dishes = await Dish.find({ userId: user._id})

    //render the dashboard.ejs file, passing in dishes as variable
    response.render('users/dashboard.ejs', { dishes, user, title: 'Skillet List | Dashboard' })
})

module.exports = router