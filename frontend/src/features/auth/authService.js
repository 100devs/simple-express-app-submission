import axios from 'axios';

const API_URL = '/api/customers/';

// Register Customer
const register = async (customerData) => {
  const response = await axios.post(API_URL, customerData);

  if (response.data) {
    localStorage.setItem('customer', JSON.stringify(response.data));
  }

  return response.data;
};

// Login Customer
const login = async (customerData) => {
  const response = await axios.post(API_URL + 'login', customerData);

  if (response.data) {
    localStorage.setItem('customer', JSON.stringify(response.data));
  }

  return response.data;
};

// Logout Customer
const logout = () => {
  localStorage.removeItem('customer');
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
