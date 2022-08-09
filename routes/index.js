const express = require('express')
const router = express.Router()
const { ensureGuest, ensureAuth } = require('../middleware/auth')

const Entry = require('../models/Entry')

// @desc    Login/Landing Page
// @route   GET /
router.get('/', ensureGuest, (req, res) => {
  res.render('login', {
    layout: 'login'
  })
})

// @desc    Dashboard
// @route   GET /dashboard
router.get('/dashboard', ensureAuth, async (req, res) => {
  try {
    const entries = await Entry.find({ user: req.user.id }).lean()
    res.render('dashboard', {
      name: req.user.firstName,
      entries
    })
  } catch (error) {
    console.error(error)
    res.render('error/500')
  }
})

module.exports = router