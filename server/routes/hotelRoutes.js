const express = require('express');
const router = express.Router();
const hotelController = require('../controllers/hotelController')

// App Routes

router.get('/', hotelController.homepage);
router.post('/search', hotelController.searchGuest)
router.get('/submit-guest', hotelController.submitGuest)
router.post('/submit-guest', hotelController.submitGuestOnPost)
router.get('/delete-guest/:id', hotelController.deleteGuest)
router.get('/edit-guest/:id', hotelController.editGuest)
router.post('/edit-guest/:id', hotelController.editGuestOnPost)

module.exports = router;