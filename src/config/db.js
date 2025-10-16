require('dotenv').config()
const mongoose = require('mongoose')

const connectDB = async () => {
  const uri = process.env.MONGODB_URI
  if (!uri) {
    console.warn('MONGODB_URI not set; starting without database')
    return
  }
  try {
    await mongoose.connect(uri)
    console.log('MongoDB connected')
  } catch (err) {
    console.warn('MongoDB connection failed; continuing without DB:', err.message)
  }
}

module.exports = connectDB
