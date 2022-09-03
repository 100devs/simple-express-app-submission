//Handles initial GET request for homepage
//Handles POST method request for adding a new task

const express = require("express")
const router = express.Router()
const homeController = require("../controllers/home")
const { ensureAuth } = require("../middleware/auth")

//add specific routes for specific tasks
router.get("/", ensureAuth, homeController.getDashboard)
router.post("/", homeController.addLesson)


module.exports = router