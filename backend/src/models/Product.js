const { DataTypes } = require('sequelize');
const sequelize = require('../server');

const Product = sequelize.define('Product', {
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  price: { type: DataTypes.FLOAT, allowNull: false },
  imageUrl: { type: DataTypes.STRING },
});

module.exports = Product;