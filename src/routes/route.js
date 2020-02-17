const {Router} = require('express')

const router = Router()

const {auth} = require('../middlewares')
const {userController, teamController} = require('../controllers')

router.get('/', (req, res) => {
  res.json({message: 'Server was started'})
})

router.post('/signUp', userController.signUp)
router.post('/login', userController.login)

router.get(
  '/users',
  auth.allowIfLoggedin,
  // grantAccess('readAny', 'playerProfile'),
  userController.getAllUsers
)
router.get('/user/:id', auth.allowIfLoggedin, userController.getUserById)
router.delete('/user/:id', userController.deleteUserById)
router.get('/confirmation/:token', userController.confirmationUserEmail)

router.get('/teams', auth.allowIfLoggedin, teamController.getAllTeams)
router.post('/team', teamController.createTeam)
router.post('/team/requestToTeam', auth.allowIfLoggedin, teamController.requestToTeam)
router.get('/team/approveUserToTeam', auth.allowIfLoggedin, teamController.approveUserToTeam)
router.post('/team/addManagerToTeam', auth.allowIfLoggedin, teamController.addManagerToTeam)
router.get('/team/:id', auth.allowIfLoggedin, teamController.getTeamById)
router.delete('/team/:id', teamController.deleteTeamById)

module.exports = router
