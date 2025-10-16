const router = require('express').Router()
const { suggest } = require('../controllers/suggestionsController')

router.get('/', suggest)

module.exports = router
