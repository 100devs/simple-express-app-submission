const mongoose = require('mongoose');

const inventorySchema = mongoose.Schema(
  {
    itemName: {
      type: String,
      required: true,
    },
    itemDesc: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    image: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Inventory', inventorySchema, 'inventory');
