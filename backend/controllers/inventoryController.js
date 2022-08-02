const asyncHandler = require('express-async-handler');
const Inventory = require('../model/inventoryModel');

// Get complete inventory
// GET /api/inventory
// Public
const getInventory = asyncHandler(async (req, res) => {
  const inventory = await Inventory.find();
  res.status(200).json(inventory);
});

// Create inventory item
// POST /api/inventory
// Public
const createInventory = asyncHandler(async (req, res) => {
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

// Update inventory item
// PUT /api/inventory/:id
// Public
const updateInventory = asyncHandler(async (req, res) => {
  const inventoryItem = await Inventory.findById(req.params.id);

  if (!inventoryItem) {
    res.status(400);
    throw new Error('Inventory item not found');
  }

  const updatedInventoryItem = await Inventory.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json(updatedInventoryItem);
});

// Delete inventory item
// DELETE /api/inventory/:id
// Public
const deleteInventory = asyncHandler(async (req, res) => {
  const inventoryItem = await Inventory.findById(req.params.id);

  if (!inventoryItem) {
    res.status(400);
    throw new Error('Inventory item not found');
  }

  await inventoryItem.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getInventory,
  createInventory,
  updateInventory,
  deleteInventory,
};
