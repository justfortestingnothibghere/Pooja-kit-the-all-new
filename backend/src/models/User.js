const { DataTypes } = require('sequelize');
const sequelize = require('../server'); // This should be the instance!

const User = sequelize.define('User', {
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.STRING, defaultValue: 'USER' }, // USER or ADMIN
});

module.exports = User;
