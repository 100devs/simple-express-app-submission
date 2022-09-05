// Handle editing and deleting items, as well as rendering the edit page itself

const express = require("express")
const router = express.Router()
const editController = require("../controllers/edit")
const { ensureAuth } = require("../middleware/auth")

//add specific routes for specific tasks
router.get("/:id", ensureAuth, editController.editLesson)
router.get("/remove/:id", editController.deleteLesson)
router.post("/:id", editController.updateLesson)

module.exports = router