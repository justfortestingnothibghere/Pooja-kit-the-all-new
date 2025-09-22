const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./User');

const Order = sequelize.define('Order', {
  userId: { type: DataTypes.INTEGER, references: { model: User, key: 'id' } },
  products: { type: DataTypes.JSON, allowNull: false }, // Array of {id, name, price, quantity}
  deliveryAddress: { type: DataTypes.STRING, allowNull: false },
  city: { type: DataTypes.STRING, allowNull: false },
  state: { type: DataTypes.STRING, allowNull: false },
  pincode: { type: DataTypes.STRING, allowNull: false },
  status: { type: DataTypes.STRING, defaultValue: 'Pending' }, // Pending, Shipped, Delivered
  estimatedDelivery: { type: DataTypes.STRING },
});

module.exports = Order;
