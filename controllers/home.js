const DrivingHours = require("../models/hours")
const moment = require('moment')

module.exports = {
    getDashboard : async (req, res) => {
        try {
            const hours = await DrivingHours.find()
            res.render("dashboard.ejs", {
                DrivingHours: hours,
                moment: moment
            })
        } catch (err) {
            if (err) return res.status(500).send(err.toString())
        }
    },
    addLesson: async (req, res) => {
        const addHours = new DrivingHours(
            {
                totalHours: req.body.totalHours,
                nightHours: req.body.nightHours,
                hwyHours: req.body.hwyHours,
                instructor: req.body.instructor,
                note: req.body.note,
            }
        )
        try {
            await addHours.save()
            console.log(addHours)
            res.redirect("/")
        } catch(err) {
            if (err) return res.status(500).send(err)
            res.redirect("/")
        }
    }
}