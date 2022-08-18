const mongoose = require("mongoose")
const drivinghoursSchema = new mongoose.Schema( {
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
    }
})

module.exports = mongoose.model("DrivingHours", drivinghoursSchema, "user")