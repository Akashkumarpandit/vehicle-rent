const mongoose = require('mongoose')
const Vehicle = require('../models/Vehicle')

const demoVehicles = [
  { make: 'BMW', model: '3 Series', year: 2022, type: 'Car', pricePerDay: 95 },
  { make: 'Mercedes-Benz', model: 'C-Class', year: 2021, type: 'Car', pricePerDay: 110 },
  { make: 'Audi', model: 'A4', year: 2020, type: 'Car', pricePerDay: 99 },
  { make: 'Kawasaki', model: 'Ninja 400', year: 2021, type: 'Bike', pricePerDay: 65 },
  { make: 'Royal Enfield', model: 'Classic 350', year: 2022, type: 'Bike', pricePerDay: 45 },
  { make: 'Honda', model: 'Activa 6G', year: 2022, type: 'Scooter', pricePerDay: 20 }
]

// GET /vehicles - list vehicles (basic)
exports.list = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.json(demoVehicles)
    }
    const vehicles = await Vehicle.find().limit(50)
    res.json(vehicles)
  } catch (e) {
    res.json(demoVehicles)
  }
}

// POST /vehicles - create (stub, no auth)
exports.create = async (req, res) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ error: 'DB not connected' })
  }
  const v = await Vehicle.create(req.body)
  res.status(201).json(v)
}
