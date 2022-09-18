const express = require('express')
const router = express.Router()
const wordController = require('../controllers/wordController')

router.get('/', wordController.getPage)

router.post('/addWord', wordController.addWord)

router.put('/setHard', wordController.setHard)

router.put('/setEasy', wordController.setEasy)

router.delete('/removeOne', wordController.removeOne)

module.exports = router