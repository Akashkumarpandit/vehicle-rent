const dotenv = require('dotenv')
const connectDB = require('./config/db')
const app = require('./app')

dotenv.config()

const PORT = process.env.PORT || 4000
connectDB()
  .then(() => app.listen(PORT, () => console.log(`API running on :${PORT}`)))
  .catch((err) => {
    console.error('Failed to start server', err)
    process.exit(1)
  })
