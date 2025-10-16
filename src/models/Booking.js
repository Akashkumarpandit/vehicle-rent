const mongoose = require('mongoose')

const BookingSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' },
    startDate: Date,
    endDate: Date,
    totalPrice: Number,
    status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Booking', BookingSchema)
