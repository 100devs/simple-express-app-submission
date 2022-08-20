const express = require('express')
const router = express.Router()
const logController = require('../controllers/log')

router.get('/', logController.getLog)

router.post('/add-show', logController.addShow)

router.get('/:id', logController.getEdit)
router.post('/:id', logController.updateShow)

router.delete('/delete-show', logController.deleteShow)

module.exports = router