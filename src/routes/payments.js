const router = require('express').Router()
const { createIntent } = require('../controllers/paymentsController')

router.post('/create-intent', createIntent)

module.exports = router
