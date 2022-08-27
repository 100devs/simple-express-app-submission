const mongoose = require("mongoose")
const drivingHoursSchema = new mongoose.Schema( {
    date: {
        type: Date,
        default: Date.now
    },
    note: {
        type: String,
    },
    totalHours: {
        type: Number,
        required: true
    },
    cumulative: {
        type: Number,
    },
    nightHours: {
        type: Number,
    },
    totalNight: {
        type: Number,
    },
    hwyHours: {
        type: Number,
    },
    totalHwy: {
        type: Number,
    },
    instructor: {
        type: String,
    }
})

module.exports = mongoose.model("DrivingHours", drivingHoursSchema, "hours")