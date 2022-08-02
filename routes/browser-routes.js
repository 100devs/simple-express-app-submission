const express = require('express')
const {check} = require('express-validator')

const browserControllers = require('../controllers/browser-controllers')
const router = express.Router()

router.get('/', browserControllers.getEntries)
router.get('/crud', browserControllers.getEditPage)
router.get('/doc', browserControllers.getDocPage)
router.get('/search/:query', browserControllers.searchEntries)
router.get('/:category', browserControllers.getCategory)

router.post('/', [
    check('original').notEmpty(),
    check('corporate').isLength({min:5})
], browserControllers.createEntry)

router.patch('/', [
    check('original').notEmpty(),
    check('corporate').isLength({min:5}),
    check('category').isIn(['general', 'lazy', 'boundary', 'demand', 'interview'])
], browserControllers.editEntry)

router.delete('/', browserControllers.deleteEntry)

module.exports = router