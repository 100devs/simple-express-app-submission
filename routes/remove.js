const express = require('express');
const Reserves = require('../models/Reserves');
const Starters = require('../models/Starters');
const router = express.Router();


// @desc    Delete Starter Pokemon
// @route   DEL /remove/starter/:id
router.get('/starter/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await Starters.findByIdAndRemove(id, err => {
      if (err) {
        return res.status(500).send(err);
      }
      res.redirect('/');
    })
  } catch(err) {
    console.log(err);
  }
})


// @desc    Delete Reserve Pokemon
// @route   DEL /remove/reserve/:id
router.get('/reserve/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await Reserves.findByIdAndRemove(id, err => {
      if(err) {
        return res.status(500).send(err);
      }
      res.redirect('/');
    })
  } catch(err) {
    console.log(err);
  }
})

module.exports = router;