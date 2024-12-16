const mongoose = require('mongoose');

// Set up default mongoose connection
const mongoDB = 'mongodb://127.0.0.1/my_database';

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoDB); // No options needed in recent versions
    console.log('Connected to MongoDB successfully...');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit the application on connection failure
  }
};

module.exports = connectToMongo;
