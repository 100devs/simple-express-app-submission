const asyncHandler = require('express-async-handler');
const Order = require('../model/orderModel');

// Get all orders
// GET /api/orders
// Public
const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find();
  res.status(200).json(orders);
});

// Get user orders
// POST /api/orders/:id
// Public
const getOrder = asyncHandler(async (req, res) => {
  // error handling for missing body data
  if (
    !req.body.itemName ||
    !req.body.itemDesc ||
    !req.body.category ||
    !req.body.stock
  ) {
    res.status(400);
    throw new Error('Please make sure you have all required fields filled out');
  }

  const inventoryItem = await Inventory.create({
    itemName: req.body.itemName,
    itemDesc: req.body.itemDesc,
    category: req.body.category,
    stock: req.body.stock,
  });

  res.status(200).json(inventoryItem);
});

module.exports = {
  getAllOrders,
  getOrder,
};
