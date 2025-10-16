const Vehicle = require('../models/Vehicle')

// GET /vehicles - list vehicles (basic)
exports.list = async (req, res) => {
  const vehicles = await Vehicle.find().limit(50)
  res.json(vehicles)
}

// POST /vehicles - create (stub, no auth)
exports.create = async (req, res) => {
  const v = await Vehicle.create(req.body)
  res.status(201).json(v)
}
