const Booking = require('../models/Booking')

exports.create = async (req, res) => {
  const { userId, vehicleId, startDate, endDate, totalPrice } = req.body
  const booking = await Booking.create({ userId, vehicleId, startDate, endDate, totalPrice, status: 'confirmed' })
  res.status(201).json(booking)
}
