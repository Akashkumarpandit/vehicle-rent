const admin = require('firebase-admin')

let initialized = false
function initFirebase() {
  if (initialized) return
  if (!process.env.FIREBASE_PROJECT_ID) return
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
    })
  })
  initialized = true
}

exports.verifyAuth = async (req, res, next) => {
  try {
    initFirebase()
    const authHeader = req.headers.authorization || ''
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null
    if (!token) return res.status(401).json({ error: 'No token' })
    const decoded = await admin.auth().verifyIdToken(token)
    req.user = decoded
    next()
  } catch (e) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
}
