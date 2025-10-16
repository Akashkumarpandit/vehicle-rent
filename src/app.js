const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const path = require('path')

const app = express()
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

// Static client (serves /public)
app.use(express.static(path.join(__dirname, '../public')))

app.get('/health', (_req, res) => res.json({ ok: true }))

// Routes
app.use('/api/vehicles', require('./routes/vehicles'))
app.use('/api/bookings', require('./routes/bookings'))
app.use('/api/users', require('./routes/users'))
app.use('/api/payments', require('./routes/payments'))
app.use('/api/maps', require('./routes/maps'))
app.use('/api/suggestions', require('./routes/suggestions'))

// Default: send homepage
app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, '../public/vehicles/index.html'))
})

module.exports = app
