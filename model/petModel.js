const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const healthMetrics = require('./petInfoModel').schema
const petModelSchema = new Schema({
    petName: {
        type: String,
        required: true
    },
    petAge: {
        type: Number,
        required: true
    },
    petSpecies: {
        type: String,
        required: true
    },
    healthMetrics: [healthMetrics]
})

const Pet = mongoose.model("Pet", petModelSchema);

module.exports = Pet;