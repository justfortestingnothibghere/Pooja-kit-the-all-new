const express = require('express');
const cors = require('cors');
const path = require('path');
const sequelize = require('./models/db'); // ✅ import instance
const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');

const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');

const bcrypt = require('bcryptjs');
const app = express();

app.use(cors());
app.use(express.json());

// Sync database and seed
sequelize.sync({ force: true }).then(async () => {
  await User.create({
    email: 'armanhacker900@gmail.com',
    password: await bcrypt.hash('admin-1234', 10),
    role: 'ADMIN',
  });

  await Product.bulkCreate([
    { name: 'Daily Pooja Kit', description: 'Ready-to-use kit for daily worship', price: 499, imageUrl: 'https://via.placeholder.com/150' },
    { name: 'Festival Pooja Kit', description: 'Complete set for festivals', price: 999, imageUrl: 'https://via.placeholder.com/150' },
  ]);

  console.log('Database synced and seeded');
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Serve React frontend
app.use(express.static(path.join(__dirname, '../../frontend/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/build', 'index.html'));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
