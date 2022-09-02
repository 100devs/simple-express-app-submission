const DrivingHours = require("../models/hours")

module.exports = {
    editLesson : (req, res) => {
        const id = req.params.id
        DrivingHours.find({}, (err, hours) => {
            res.render("edit.ejs", {
                DrivingHours: hours, 
                idHours: id,
                moment: moment
            })
        })
    },
    deleteLesson: (req, res) => {
        const id = req.params.id
        DrivingHours.findByIdAndRemove(id, err => {
            if (err) return res.status(500).send(err)
            res.redirect("/")
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
            },
            err => {
                if (err) return res.status(500).send(err)
                res.redirect("/")
            })
    }
}