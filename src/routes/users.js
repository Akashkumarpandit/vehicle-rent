const router = require('express').Router()
const { verifyAuth } = require('../controllers/authController')
const { me } = require('../controllers/usersController')

router.get('/me', verifyAuth, me)

module.exports = router
