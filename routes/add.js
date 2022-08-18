const express = require('express');
const Reserves = require('../models/Reserves');
const Starters = require('../models/Starters');
const router = express.Router();


// @desc    Add Pokemon To Starers
// @route   POST /add/starter
router.post('/starter', async (req, res) => {
  try {
    console.log(req.body);
    await Starters.create(req.body);
    res.redirect('/');
  } catch(err) {
    res.status(500).send({message: err.message});
  }
})


// @desc    Add Pokemon To Reserves
// @route   POST /add/reserve
router.post('/reserve', async (req, res) => {
  try {
    console.log(req.body);
    await Reserves.create(req.body);
    res.redirect('/');
  } catch(err) {
    res.status(500).send({message: err.message});
  }
})

module.exports = router;