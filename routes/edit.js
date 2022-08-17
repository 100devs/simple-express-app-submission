const express = require('express');
const { appendFile } = require('fs');
const Reserves = require('../models/Reserves');
const Starters = require('../models/Starters');
const router = express.Router();

// @desc    Get Starter Pokemon
// @route   GET /edit/starter/:id
router.get('/starter/:id', async (req, res) => {
  const id = req.params.id;
  console.log('Success!');
  const starterPoke = await Starters.find({});
  const reservePoke = await Reserves.find({});
    res.render('edit.ejs', {
      starters: starterPoke,
      rest: reservePoke,
      idStarter: id,
      idReserve: null,
    })
})


// @desc    Edit Starter Pokemon
// @route   PUT /edit/starter/:id
router.post('/starter/:id', (req, res) => {
  const id = req.params.id;
  Starters.findByIdAndUpdate(
    id,
    {
      name: req.body.name,
      currentLevel: req.body.currentLevel,
    },
    err => {
      if(err) return res.status(500).send(err);
      res.redirect('/');
    }
  )
})


// @desc    Get Reserve Pokemon
// @route   GET /edit/reserve/:id
router.get('/reserve/:id', async (req, res) => {
  const id = req.params.id;
  console.log('Success!');
  const starterPoke = await Starters.find({});
  const reservePoke = await Reserves.find({});
    res.render('edit.ejs', {
      starters: starterPoke,
      rest: reservePoke,
      idReserve: id,
      idStarter: null,
    })
})


// @desc    Edit Reserve Pokemon
// @route   PUT /edit/reserve/:id
router.post('/reserve/:id', (req, res) => {
  const id = req.params.id;
  Reserves.findByIdAndUpdate(
    id,
    {
      name: req.body.name,
      currentLevel: req.body.currentLevel,
      boxNumber: req.body.boxNumber,
    },
    err => {
      if(err) return res.status(500).send(err);
      res.redirect('/');
    }
  )
})




module.exports = router;