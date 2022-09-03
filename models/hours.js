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
    nightHours: {
        type: Number,
    },
    hwyHours: {
        type: Number,
    },
    instructor: {
        type: String,
    }
})

module.exports = mongoose.model("DrivingHours", drivingHoursSchema, "hours")