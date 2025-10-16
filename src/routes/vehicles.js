const router = require('express').Router()
const { list, create } = require('../controllers/vehiclesController')

router.get('/', list)
router.post('/', create) // TODO: protect with verifyAuth when ready

module.exports = router
