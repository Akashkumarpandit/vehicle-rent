const router = require('express').Router()
const { create } = require('../controllers/bookingsController')

router.post('/', create)

module.exports = router
