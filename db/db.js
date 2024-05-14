// db.js
const mongoose = require('mongoose');
const config = require('../config/config');

const { HOST, PORT, DATABASE } = config[process.env.NODE_ENV].DB;
const mongoURI = `mongodb://${HOST}:${PORT}/${DATABASE}`;

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;

