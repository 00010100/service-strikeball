const {Router} = require('express')
const auth = require('./auth')
const user = require('./user')
const team = require('./team')
const request = require('./request')

const router = Router()

router.use('/auth', auth)
router.use('/user', user)
router.use('/team', team)
router.use('/request', request)

module.exports = router
