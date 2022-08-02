const express = require('express')
const {check} = require('express-validator')

const apiControllers = require('../controllers/api-controllers')
const router = express.Router()

router.get('/random', apiControllers.getRandomApi)
router.get('/search/:query', apiControllers.searchApi)
router.get('/:category', apiControllers.getCategoryApi)

router.patch('/:id', [
    check('original').notEmpty(),
    check('corporate').isLength({min:5}),
    check('category').isIn(['general', 'lazy', 'boundary', 'demand', 'interview'])
], apiControllers.editEntryApi)


module.exports = router