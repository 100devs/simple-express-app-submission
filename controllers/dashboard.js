const DrivingHours = require("../models/hours")
const moment = require('moment')

module.exports = {
    getIndex: (req,res)=>{
        res.render('index.ejs', {
            user: req.user
        })
    },
    getDashboard : async (req, res) => {
        try {
            const hours = await DrivingHours.find({userId:req.user.id})
            res.render("dashboard.ejs", {
                DrivingHours: hours,
                moment: moment,
                user: req.user
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
                userId: req.user.id
            }
        )
        try {
            await addHours.save()
            console.log(addHours)
            res.redirect("/dashboard")
        } catch(err) {
            if (err) return res.status(500).send(err)
            res.redirect("/dashboard")
        }
    }
}