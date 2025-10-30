require('dotenv').config()
const mongoose = require('mongoose')
const Vehicle = require('./src/models/Vehicle')

async function createBMW() {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('Connected to MongoDB')

    const bmw = await Vehicle.create({
      make: 'BMW',
      model: 'G310R',
      year: 2022,
      type: 'motorcycle',
      location: {
        type: 'Point',
        coordinates: [-122.4194, 37.7749] // San Francisco default
      },
      pricePerDay: 85,
      imageUrl: 'https://cdn.pixabay.com/photo/2020/06/25/06/14/motorcycle-5338695_1280.jpg',
      features: ['ABS', 'LED headlights', 'Digital display']
    })

    console.log('Created BMW G310R:', bmw)

    await mongoose.connection.close()
  } catch (error) {
    console.error('Error:', error)
    process.exit(1)
  }
}

createBMW()
