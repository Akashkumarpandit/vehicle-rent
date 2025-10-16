const router = require('express').Router()
const { distance } = require('../controllers/mapsController')

router.get('/distance', distance)

module.exports = router
