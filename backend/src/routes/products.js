const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

// Middleware to check admin role
const isAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'ADMIN') return res.status(403).json({ error: 'Admins only' });
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Get all products
router.get('/', async (req, res) => {
  const products = await Product.findAll();
  res.json(products);
});

// Create product (admin only)
router.post('/', isAdmin, async (req, res) => {
  const { name, description, price, imageUrl } = req.body;
  const product = await Product.create({ name, description, price, imageUrl });
  res.status(201).json(product);
});

// Update product (admin only)
router.put('/:id', isAdmin, async (req, res) => {
  const { name, description, price, imageUrl } = req.body;
  await Product.update({ name, description, price, imageUrl }, { where: { id: req.params.id } });
  res.json({ message: 'Product updated' });
});

// Delete product (admin only)
router.delete('/:id', isAdmin, async (req, res) => {
  await Product.destroy({ where: { id: req.params.id } });
  res.json({ message: 'Product deleted' });
});

module.exports = router;