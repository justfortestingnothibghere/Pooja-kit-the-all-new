const express = require('express');
const jwt = require('jsonwebtoken');
const Order = require('../models/Order');
const router = express.Router();

// Middleware to check authenticated user
const isAuthenticated = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Place order
router.post('/', isAuthenticated, async (req, res) => {
  const { products, deliveryAddress, city, state, pincode } = req.body;
  const estimatedDelivery = state.toLowerCase().includes('north') ? '3-5 days' : '5-7 days';
  const order = await Order.create({
    userId: req.user.id,
    products,
    deliveryAddress,
    city,
    state,
    pincode,
    estimatedDelivery,
  });
  res.status(201).json(order);
});

// Get user orders
router.get('/', isAuthenticated, async (req, res) => {
  const orders = await Order.findAll({ where: { userId: req.user.id } });
  res.json(orders);
});

// Get all orders (admin only)
router.get('/all', isAuthenticated, async (req, res) => {
  if (req.user.role !== 'ADMIN') return res.status(403).json({ error: 'Admins only' });
  const orders = await Order.findAll();
  res.json(orders);
});

// Update order status (admin only)
router.put('/:id', isAuthenticated, async (req, res) => {
  if (req.user.role !== 'ADMIN') return res.status(403).json({ error: 'Admins only' });
  const { status } = req.body;
  await Order.update({ status }, { where: { id: req.params.id } });
  res.json({ message: 'Order updated' });
});

module.exports = router;