// import character model
const { ObjectId } = require('mongodb');
const Character = require('../models/character.model');

// return a list of all characters in the database
const getAllCharacters = async (req, res) => {
  Character.find()
    .then((allChars) => res.status(200).json(allChars))
    .catch((err) => res.status(400).json(`Error! ${err}`));
};

// get single character by name
const characterByName = async (req, res) => {
  const myQuery = { name: req.params.name };
  Character.findOne(myQuery)
    .then((char) => res.status(200).json(char))
    .catch((err) => res.status(400).json(`Error! ${err}`));
};

// get single character by id
const characterById = async (req, res) => {
  const myQuery = { _id: ObjectId(req.params.id) };
  Character.findById(myQuery)
    .then((char) => res.status(200).json(char))
    .catch((err) => res.status(400).json(`Error! ${err}`));
};

// add character
const addCharacter = (req, res) => {
  const myObj = {
    name: req.body.name,
    planet: req.body.planet,
  };

  // check if content is missing or blank
  if (Object.values(myObj).includes(undefined) || Object.values(myObj).includes('')) {
    return res.status(400).json({
      error: 'content missing',
    });
  }

  // add to the database
  Character.create(myObj)
    .then((char) => res.status(200).json(char))
    .catch((err) => res.status(400).json(`Error! ${err}`));

  return null;
};

// update character by id
const updateCharacter = async (req, res) => {
  const myQuery = { _id: ObjectId(req.params.id) };

  const newValues = {
    $set: {
      name: req.body.name,
      planet: req.body.planet,
    },
  };

  // check if content is missing or blank
  if (Object.values(newValues.$set).includes(undefined) || Object.values(newValues.$set).includes('')) {
    return res.status(400).json({
      error: 'content missing',
    });
  }

  Character.updateOne(myQuery, newValues)
    .then((char) => res.status(200).json(char))
    .catch((err) => res.status(400).json(`Error! ${err}`));

  return newValues;
};

// delete character by id
const deleteCharacter = async (req, res) => {
  const myQuery = { _id: ObjectId(req.params.id) };
  Character.findOneAndDelete(myQuery)
    .then((char) => res.status(200).json('deleted successfully'))
    .catch((err) => res.status(400).json(`Error! ${err}`));
};

module.exports = {
  getAllCharacters,
  characterByName,
  characterById,
  addCharacter,
  updateCharacter,
  deleteCharacter,
};
