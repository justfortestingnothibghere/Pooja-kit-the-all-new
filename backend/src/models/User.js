const { DataTypes } = require('sequelize');
const sequelize = require('../server'); // ✅ now correctly points to instance

const User = sequelize.define('User', {
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.STRING, defaultValue: 'USER' },
});

module.exports = User;
