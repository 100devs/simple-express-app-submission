const express = require('express');
const router = express.Router();
const {
  getAllOrders,
  getOrders,
  createOrder,
  deleteOrder,
} = require('../controllers/orderController');
const { protect } = require('../middleware/authmiddleware');

router.route('/').get(getOrders).get(getAllOrders).post(createOrder);
router.route('/:id').delete(deleteOrder);

module.exports = router;
