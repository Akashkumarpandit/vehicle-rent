const dotenv = require('dotenv')
const connectDB = require('./config/db')
const app = require('./app')

dotenv.config()

const PORT = process.env.PORT || 4000
;(async () => {
  try {
    await connectDB()
  } catch (e) {
    console.warn('Continuing without DB:', e.message)
  }
  app.listen(PORT, () => console.log(`API running on :${PORT}`))
})()
