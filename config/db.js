const mongoose = require('mongoose');
const config = require('config');
const db = config.mongoURI;

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ MongoDB Connected...');
  } catch (err) {
    console.error('❌ MongoDB Connection Failed', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
