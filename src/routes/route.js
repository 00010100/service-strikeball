const {Router} = require('express')

const router = Router()

const middlewares = require('../middlewares')
const {userController, teamController} = require('../controllers')

router.get('/', (req, res) => {
  res.json({message: 'Server was started'})
})

router.post('/signUp', userController.signUp)
router.post('/login', userController.login)

router.get(
  '/users',
  middlewares.allowIfLoggedin,
  // middlewares.grantAccess('readAny', 'playerProfile'),
  userController.getAllUsers
)
router.get('/user/:id', middlewares.allowIfLoggedin, userController.getUserById)
router.delete('/user/:id', userController.deleteUserById)
router.get('/confirmation/:token', userController.confirmationUserEmail)

router.get('/teams', middlewares.allowIfLoggedin, teamController.getAllTeams)
router.post('/team', teamController.createTeam)
router.post('/team/requestToTeam', middlewares.allowIfLoggedin, teamController.requestToTeam)
router.get('/team/approveUserToTeam', middlewares.allowIfLoggedin, teamController.approveUserToTeam)
router.post('/team/addManagerToTeam', middlewares.allowIfLoggedin, teamController.addManagerToTeam)
router.get('/team/:id', middlewares.allowIfLoggedin, teamController.getTeamById)
router.delete('/team/:id', teamController.deleteTeamById)

module.exports = router
