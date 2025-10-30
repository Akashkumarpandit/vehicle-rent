require('dotenv').config()
const mongoose = require('mongoose')
const Vehicle = require('./src/models/Vehicle')

async function listVehicles() {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('Connected to MongoDB')

    const vehicles = await Vehicle.find({})
    console.log(`Found ${vehicles.length} vehicles:`)
    vehicles.forEach(v => {
      console.log(`- ${v.year} ${v.make} ${v.model} (ID: ${v._id})`)
      console.log(`  Image: ${v.imageUrl || 'none'}`)
    })

    await mongoose.connection.close()
  } catch (error) {
    console.error('Error:', error)
    process.exit(1)
  }
}

listVehicles()
