const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const users = [
  {
    customerId: 'LogisticsCo',
    email: 'admin@logistics.com',
    password: 'admin123',
    role: 'Admin'
  },
  {
    customerId: 'RetailGmbH',
    email: 'admin@retail.com',
    password: 'admin123',
    role: 'Admin'
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await User.deleteMany({});
    await User.insertMany(users);
    console.log('✅ Seeded successfully');
    process.exit();
  } catch (err) {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  }
}

seed();
