const admin = require('firebase-admin')
const User = require('../models/User')

exports.me = async (req, res) => {
  // Requires verifyAuth middleware to set req.user
  if (!req.user) return res.status(401).json({ error: 'Unauthorized' })
  const { uid, name, email, picture } = req.user
  // Optional upsert for convenience
  const user = await User.findOneAndUpdate(
    { firebaseUid: uid },
    { displayName: name, email, photoURL: picture },
    { new: true, upsert: true }
  )
  res.json({ user })
}
