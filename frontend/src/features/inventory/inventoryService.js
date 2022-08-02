import axios from 'axios';

const API_URL = 'api/inventory/';

// Create new inventory item
const createInventoryItem = async (inventoryData) => {
  const response = await axios.post(API_URL, inventoryData);
  return response.data;
};

// Get all inventory
const getInventory = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Delete inventory item
const deleteInventoryItem = async (id) => {
  const response = await axios.delete(API_URL + id);
  return response.data;
};

// Update inventory item
const updateInventoryItem = async (id, body) => {
  console.log(body);
  const response = await axios.put(API_URL + id, body);
  return response.data;
};

const inventoryService = {
  createInventoryItem,
  getInventory,
  deleteInventoryItem,
  updateInventoryItem,
};

export default inventoryService;
