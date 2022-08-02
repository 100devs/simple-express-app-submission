const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const Customer = require('../model/customerModel');
const e = require('express');

// Create new customer profile
// POST /api/customers
// Public
const createCustomer = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  // Check if customer with same email already exist
  const customerExists = await Customer.findOne({ email });

  if (customerExists) {
    res.status(400);
    throw new Error('Customer with that email already exists');
  }

  // hashing password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create customer
  const customer = await Customer.create({
    name,
    email,
    password: hashedPassword,
  });

  if (customer) {
    res.status(201).json({
      _id: customer.id,
      name: customer.name,
      email: customer.email,
      token: generateToken(customer._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid customer data');
  }
});

// Authenticate Customer
// POST /api/customers/login
// Public
const loginCustomer = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const customer = await Customer.findOne({ email });

  if (customer && (await bcrypt.compare(password, customer.password))) {
    res.json({
      _id: customer.id,
      name: customer.name,
      email: customer.email,
      token: generateToken(customer._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid email or password');
  }
});

// Get Customer Data
// GET /api/customers/me
// Private
const getCustomer = asyncHandler(async (req, res) => {
  res.status(200).json({
    _id: req.customer.id,
    name: req.customer.name,
    email: req.customer.email,
  });
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

module.exports = {
  createCustomer,
  loginCustomer,
  getCustomer,
};
