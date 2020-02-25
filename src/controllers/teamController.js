const {TeamModel} = require('../models')
const {wrap} = require('../middlewares')
const {teamValidate} = require('../validator')

const createTeam = wrap(async (req, res) => {
  const data = await teamValidate.create(req.body)

  res.send(data)
})

const getAllTeams = wrap(async (req, res) => {
  // TODO - change
  res.send(await TeamModel.find())
})

const getTeamById = wrap(async (req, res) => {
  const data = await teamValidate.getById(req.params)

  res.send(data)
})

const getPlayersByTeam = wrap(async (req, res) => {
  const data = await teamValidate.getPlayersByTeamId(req.user)

  res.send(data)
})

const addManagerToTeam = wrap(async (req, res) => {
  const data = await teamValidate.addManager(req)

  res.send(data)
})

const deleteTeamById = wrap(async (req, res) => {
  const data = await teamValidate.deleteById(req.params)

  res.send(data)
})

// const requestToTeam = async (req, res, next) => {
//   try {
//     const isValid = validate(schemas.titleSchema)(req.body)

//     if (Array.isArray(isValid)) {
//       return errorHandler(next, {code: 400})
//     }

//     if (!req.user) {
//       return errorHandler(next, {code: 404})
//     }

//     const {user, body} = req
//     const {_id, email, role, accessToken} = user
//     const {title} = body

//     if (role !== 'player') {
//       // return res.status(400).json({error: 'This type of user cannot be added to the team'})
//       return errorHandler(next, {code: 400})
//     }

//     const team = await TeamModel.findOne({title})

//     if (!team) {
//       return errorHandler(next, {code: 404})
//       // return res.status(404).json({error: 'Team does not exist'})
//     }

//     if (team.playersId.includes(_id)) {
//       // return res.status(409).json({error: 'User already in the team'})
//       return errorHandler(next, {code: 409})
//     }

//     if (team.playersCount === 10) {
//       // return res.status(400).json({error: 'Team has been already full'})
//       return errorHandler(next, {code: 409})
//     }

//     const manager = await UserModel.findById(team.managerId)

//     if (!manager) {
//       // return res.status(400).json({error: 'Team does not have manager. Try again later'})
//       return errorHandler(next, {code: 404})
//     }

//     const link = `${process.env.SERVER}/team/approveUserToTeam?token=${accessToken}&title=${team.title}&role=${role}`

//     sgMail.send({
//       to: manager.email,
//       from: email,
//       subject: `Adding to the team ${team.title} approvement`,
//       text: `Click link to add this user ${email} to the team ${team.title}: <a target="_blank" href="${link}">${link}</a>`,
//       html: `<strong>Click link to approvement this user ${email}: <a target="_blank" href="${link}">${link}</a></strong>`
//     })

//     res.status(200).json({data: null, message: 'Your request was sended'})
//   } catch (err) {
//     errorHandler(next)
//   }
// }

// const approveUserToTeam = async (req, res, next) => {
//   try {
//     const isValid = validate(schemas.approveSchema)(req.query)

//     if (Array.isArray(isValid)) {
//       return errorHandler(next, {code: 400})
//     }

//     const {token, title, role} = req.query
//     const {email: managerEmail} = req.user
//     const verified = verifyToken(token)

//     if (!verified) {
//       return errorHandler(next, {code: 404})
//     }

//     const user = await UserModel.findById(verified.userId)

//     if (!user) {
//       // return res.status(404).json({error: 'User does not exist'})
//       return errorHandler(next, {code: 404})
//     }

//     if (role !== 'player') {
//       // return res.status(400).json({error: 'This type of user cannot be added to the team'})
//       return errorHandler(next, {code: 400})
//     }

//     const team = await TeamModel.findOne({title})

//     if (!team) {
//       // return res.status(404).json({error: 'Team does not exist'})
//       return errorHandler(next, {code: 404})
//     }

//     if (team.playersId.includes(user._id)) {
//       // return res.status(409).json({error: 'User already in the team'})
//       return errorHandler(next, {code: 409})
//     }

//     if (team.playersCount === 10) {
//       // return res.status(409).json({error: 'Team has been already full'})
//       return errorHandler(next, {code: 409})
//     }

//     team.playersId.push(user._id)
//     team.playersCount++

//     await team.save()
//     await UserModel.findByIdAndUpdate(user._id, {team: team._id})

//     sgMail.send({
//       to: user.email,
//       from: managerEmail,
//       subject: `Congradulations you added to the team ${team.title}`,
//       text: `Congradulations you added to the team ${team.title}`,
//       html: `<strong>Congradulations you added to the team ${team.title}</strong>`
//     })

//     return res.status(200).json({data: {team, user}, message: 'User successfully approved'})
//   } catch (err) {
//     errorHandler(next)
//   }
// }

module.exports = {
  createTeam,
  getAllTeams,
  getTeamById,
  getPlayersByTeam,
  addManagerToTeam,
  deleteTeamById
  // requestToTeam,
  // approveUserToTeam,
}
