const mongoose = require('mongoose')
const workoutSchema = new mongoose.Schema({
    date: {
        type: String,
        require: true
    },
    location: {
        type: String,
        require: true
    },
    sport: {
        type: String,
        require: true
    },
    time: {
        type: String,
        require: true
    },
    distance: {
        type: String,
        require: true
    },
    unit: {
        type: String,
        require: true
    }
})
module.exports = mongoose.model('JournalEntry',workoutSchema, 'workouts')