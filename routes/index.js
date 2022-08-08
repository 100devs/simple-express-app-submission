const express = require('express')
const router = express.Router()
const { ensureGuest, ensureAuth } = require('../middleware/auth')

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
    res.render('dashboard', {
      name: req.user.firstName
    })
  } catch (error) {
    console.error(error)
  }
})

module.exports = router