const express = require('express');
const router = express.Router();
const {
  createCustomer,
  loginCustomer,
  getCustomer,
} = require('../controllers/customerController');
const { protect } = require('../middleware/authmiddleware');

router.post('/', createCustomer);
router.post('/login', loginCustomer);
router.get('/me', protect, getCustomer);

module.exports = router;
