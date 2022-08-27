// Variables
const express = require("express")
const app = express()
const PORT = 1337
const mongoose = require("mongoose")
const moment = require("moment")
const connectDB = require("./config/database")
require("dotenv").config({ path: "./config/.env"})
const DrivingHours = require("./models/hours")

// Middleware
app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(express.urlencoded({extended: true}))

connectDB()

// GET method
app.get("/", async (req, res) => {
    try {
        DrivingHours.find({}, (err, hours) => {
            res.render("index.ejs", {
                DrivingHours: hours,
                moment: moment
            })
        })
    } catch (err) {
        res.status(500).send({message: error.message})
    }
})

// POST method
app.post("/", async (req, res) => {
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
})

//UPDATE (edit) method
app
    .route("/edit/:id")
    .get((req, res) => {
        const id = req.params.id
        DrivingHours.find({}, (err, hours) => {
            res.render("edit.ejs", {
                DrivingHours: hours, 
                idHours: id,
                moment: moment
            })
        })
    })
    .post((req, res) => {
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
    })

//DELETE method
app
    .route("/remove/:id")
    .get((req, res) => {
        const id = req.params.id
        DrivingHours.findByIdAndRemove(id, err => {
            if (err) return res.status(500).send(err)
            res.redirect("/")
        })
    })

app.listen(process.env.PORT || PORT, ()=> console.log(`Server is running on port ${PORT}`))