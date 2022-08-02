const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const petInfoSchema = new Schema({
    date: {},
    weight: {},
    appetite: {},
    mood: {},
    water: {},
    urine: {},
    stool: {},
    stoolConsistency: {},
    vomit: {},
})

module.exports = mongoose.model('PetInfo', petInfoSchema)