const express = require('express');
const router = express.Router();
const {
  getInventory,
  createInventory,
  updateInventory,
  deleteInventory,
} = require('../controllers/inventoryController');
const { protect } = require('../middleware/authmiddleware');

router.route('/').get(getInventory).post(createInventory);
router.route('/:id').put(updateInventory).delete(deleteInventory);

module.exports = router;
