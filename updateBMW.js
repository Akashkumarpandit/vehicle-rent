require('dotenv').config()
const mongoose = require('mongoose')
const Vehicle = require('./src/models/Vehicle')

async function updateBMW() {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('Connected to MongoDB')

    const result = await Vehicle.findOneAndUpdate(
      { make: 'BMW', model: 'G310R', year: 2022 },
      { imageUrl: 'https://cdn.pixabay.com/photo/2020/06/25/06/14/motorcycle-5338695_1280.jpg' },
      { new: true }
    )

    if (result) {
      console.log('Updated BMW G310R:', result)
    } else {
      console.log('BMW G310R not found')
    }

    await mongoose.connection.close()
  } catch (error) {
    console.error('Error:', error)
    process.exit(1)
  }
}

updateBMW()
