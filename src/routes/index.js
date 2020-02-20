const {Router} = require('express')
const auth = require('./auth')
const user = require('./user')
const team = require('./team')

const router = Router()

router.use('/auth', auth)
router.use('/user', user)
router.use('/team', team)

module.exports = router
