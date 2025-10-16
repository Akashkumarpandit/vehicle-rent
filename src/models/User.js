const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
  {
    firebaseUid: { type: String, index: true },
    displayName: String,
    email: { type: String, index: true },
    photoURL: String
  },
  { timestamps: true }
)

module.exports = mongoose.model('User', UserSchema)
