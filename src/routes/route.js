const {Router} = require('express')

const router = Router()

const {userController, teamController} = require('../controllers')

router.get('/', (req, res) => {
  res.json({message: 'Server was started'})
})

router.post('/signUp', userController.signUp)
router.post('/login', userController.login)

router.get(
  '/users',
  // grantAccess('readAny', 'playerProfile'),
  userController.getAllUsers
)
router.get('/user/:id', userController.getUserById)
router.delete('/user/:id', userController.deleteUserById)
router.get('/confirmation/:token', userController.confirmationUserEmail)

router.get('/teams', teamController.getAllTeams)
router.post('/team', teamController.createTeam)
router.post('/team/requestToTeam', teamController.requestToTeam)
router.get('/team/approveUserToTeam', teamController.approveUserToTeam)
router.post('/team/addManagerToTeam', teamController.addManagerToTeam)
router.get('/team/:id', teamController.getTeamById)
router.delete('/team/:id', teamController.deleteTeamById)

module.exports = router
