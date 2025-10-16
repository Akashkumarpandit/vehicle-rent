const mongoose = require('mongoose')

const VehicleSchema = new mongoose.Schema(
  {
    make: String,
    model: String,
    year: Number,
    type: { type: String },
    location: { type: { type: String, enum: ['Point'], default: 'Point' }, coordinates: [Number] },
    pricePerDay: Number,
    imageUrl: String,
    features: [String]
  },
  { timestamps: true }
)
VehicleSchema.index({ location: '2dsphere' })
module.exports = mongoose.model('Vehicle', VehicleSchema)
