const DrivingHours = require("../models/hours")
const moment = require("moment")

module.exports = {
    editLesson : (req, res) => {
        const id = req.params.id
        DrivingHours.find({}, (err, hours) => {
            res.render("edit.ejs", {
                DrivingHours: hours, 
                idHours: id,
                moment: moment,
                user: req.user
            })
        })
    },
    deleteLesson: (req, res) => {
        const id = req.params.id
        DrivingHours.findByIdAndRemove(id, err => {
            if (err) return res.status(500).send(err)
            res.redirect("/dashboard")
        })
    },
    updateLesson : (req, res) => {
        const id = req.params.id
        DrivingHours.findByIdAndUpdate(id,
            {
                totalHours: req.body.totalHours,
                nightHours: req.body.nightHours,
                hwyHours: req.body.hwyHours,
                instructor: req.body.instructor,
                note: req.body.note,
                userId: req.user.id
            },
            err => {
                if (err) return res.status(500).send(err)
                res.redirect("/dashboard")
            })
    }
}