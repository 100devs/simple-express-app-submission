const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')

const Entry = require('../models/Entry')

// @desc    Show Add Page
// @route   GET /stories/add
router.get('/add', ensureAuth, (req, res) => {
  res.render('entries/add')
})

// @desc    Process-Add Form
// @route   POST /entries
router.post('/', ensureAuth, async (req, res) => {
  try {
    req.body.user = req.user.id
    await Entry.create(req.body)
    res.redirect('/dashboard')
  } catch (err) {
    console.log(err)
    res.render('error/500')
  }
})

// @desc    Show All Stories
// @route   GET /stories
router.get('/', ensureAuth, async (req, res) => {
  try {
    const entries = await Entry.find()
      .populate('user')
      .sort({ createdAt: 'desc' })
      .lean()

    res.render('entries/index', {
      entries
    })
  } catch (err) {
    console.log(err)
    res.render('error/500')
  }
})

// @desc    Show Single Entry
// @route   GET /entries/:id
router.get('/:id', ensureAuth, async (req, res) => {
  try {
    let entry = await Entry.findById(req.params.id)
      .populate('user')
      .lean()

    res.render('entries/show', {
      entry
    })
  } catch (err) {
    console.error(err)
    return res.render('error/404')
  }
})

// @desc    Show Edit Page
// @route   GET /entries/edit/:id
router.get('/edit/:id', ensureAuth, async (req, res) => {
  try {
    const entry = await Entry.findOne({
      _id: req.params.id
    }).lean()
  
    if (!entry) {
      return res.render('error/404')
    }
  
    if (entry.user != req.user.id) {
      res.redirect('/entries')
    } else {
      res.render('entries/edit', {
        entry
      })
    }
  } catch (err) {
    console.error(err)
    return res.render('error/500')
  }
  
})

// @desc    Update Entry
// @route   PUT /stories/:id
router.put('/:id', ensureAuth, async (req, res) => {
  try {
    let entry = await Entry.findById(req.params.id).lean()

    if (!entry) {
      return res.render('error/404')
    }
  
    if (entry.user != req.user.id) {
      res.redirect('/entries')
    } else {
      entry = await Entry.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
        runValidators: true
      })
  
      res.redirect('/dashboard')
    }
  } catch (err) {
    console.error(err)
    return res.render('error/500')
  }
  
})

// @desc    Delete Entry
// @route   DELETE /entries/:id
router.delete('/:id', ensureAuth, async (req, res) => {
  try {
    await Entry.remove({ _id: req.params.id })
    res.redirect('/dashboard')
  } catch (err) {
    console.error(err)
    return res.render('error/500')
  }
})

// @desc    User Entries
// @route   GET /entries/user/:userId
router.get('/user/:userId', ensureAuth, async (req, res) => {
  try {
    const entries = await Entry.find({
      user: req.params.userId
    })
    .populate('user')
    .lean()

    res.render('entries/user', {
      name: req.user.firstName,
      entries
    })
  } catch (err) {
    console.error(err)
    return res.render('error/404')
  }
})

module.exports = router