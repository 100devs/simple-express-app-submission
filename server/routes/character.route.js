// import express
const express = require('express');

// The router will be added as a middleware and
// will take control of requests starting with path /record.
const router = express.Router();

// import controllers
const characterController = require('../controllers/character.controller');

// GET all characters
router.get('/', characterController.getAllCharacters);
// GET single character by name
router.get('/:name', characterController.characterByName);
// GET single character by id
router.get('/ID/:id', characterController.characterById);
// POST new character
router.post('/add', characterController.addCharacter);
// POST update character by id
router.put('/update/:id', characterController.updateCharacter);
// DELETE remove character
router.delete('/delete/:id', characterController.deleteCharacter);

// export to use in server.js
module.exports = router;
