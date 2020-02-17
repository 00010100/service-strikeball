const {TeamModel, UserModel} = require('../models')
const sgMail = require('../sendgrid')
const {verifyToken, errorHandler} = require('../utils')

const createTeam = async (req, res, next) => {
  try {
    const {title} = req.body

    const newTeam = new TeamModel({title})

    await newTeam.save()

    res.status(201).json({data: newTeam})
  } catch (err) {
    errorHandler(next)
  }
}

const getAllTeams = async (req, res, next) => {
  try {
    const teams = await TeamModel.find()

    res.status(200).json({data: teams})
  } catch (err) {
    errorHandler(next)
  }
}

const getTeamById = async (req, res, next) => {
  try {
    const team = await TeamModel.findById(req.params.id)

    res.status(200).json({data: team})
  } catch (err) {
    errorHandler(next)
  }
}

const addManagerToTeam = async (req, res, next) => {
  try {
    const user = res.locals.loggedInUser
    const {title} = req.body

    if (user.role !== 'manager') {
      // return res.status(400).json({error: 'This type of user cannot be added to team like manager'})
      return errorHandler(next, {code: 400})
    }

    const team = await TeamModel.findOne({title})

    if (!team) {
      // return res.status(404).json({error: 'Team does not exist'})
      return errorHandler(next, {code: 404})
    }

    if (team.managerId) {
      // return res.status(409).json({error: 'Team already have manager'})
      return errorHandler(next, {code: 409})
    }

    const updatedTeam = await TeamModel.findOneAndUpdate({_id: team._id}, {managerId: user})

    res.status(200).json({data: updatedTeam, message: 'Manager was added to the team'})
  } catch (err) {
    errorHandler(next)
  }
}

const requestToTeam = async (req, res, next) => {
  try {
    const {title} = req.body
    const {_id, email, role, accessToken} = res.locals.loggedInUser

    if (role !== 'player') {
      // return res.status(400).json({error: 'This type of user cannot be added to the team'})
      return errorHandler(next, {code: 400})
    }

    const team = await TeamModel.findOne({title})

    if (!team) {
      return errorHandler(next, {code: 404})
      // return res.status(404).json({error: 'Team does not exist'})
    }

    if (team.playersId.includes(_id)) {
      // return res.status(409).json({error: 'User already in the team'})
      return errorHandler(next, {code: 409})
    }

    if (team.playersCount === 10) {
      // return res.status(400).json({error: 'Team has been already full'})
      return errorHandler(next, {code: 409})
    }

    const manager = await UserModel.findById(team.managerId)

    if (!manager) {
      // return res.status(400).json({error: 'Team does not have manager. Try again later'})
      return errorHandler(next, {code: 404})
    }

    const link = `${process.env.SERVER}/team/approveUserToTeam?token=${accessToken}&title=${team.title}&role=${role}`

    sgMail.send({
      to: manager.email,
      from: email,
      subject: `Adding to the team ${team.title} approvement`,
      text: `Click link to add this user ${email} to the team ${team.title}: <a target="_blank" href="${link}">${link}</a>`,
      html: `<strong>Click link to approvement this user ${email}: <a target="_blank" href="${link}">${link}</a></strong>`
    })

    res.status(200).json({data: null, message: 'Your request was sended'})
  } catch (err) {
    errorHandler(next)
  }
}

const approveUserToTeam = async (req, res, next) => {
  try {
    const {token, title, role} = req.query
    const {email: managerEmail} = req.user
    const {userId} = verifyToken(token)

    const user = await UserModel.findById(userId)

    if (!user) {
      // return res.status(404).json({error: 'User does not exist'})
      return errorHandler(next, {code: 404})
    }

    if (role !== 'player') {
      // return res.status(400).json({error: 'This type of user cannot be added to the team'})
      return errorHandler(next, {code: 400})
    }

    const team = await TeamModel.findOne({title})

    if (!team) {
      // return res.status(404).json({error: 'Team does not exist'})
      return errorHandler(next, {code: 404})
    }

    if (team.playersId.includes(user._id)) {
      // return res.status(409).json({error: 'User already in the team'})
      return errorHandler(next, {code: 409})
    }

    if (team.playersCount === 10) {
      // return res.status(409).json({error: 'Team has been already full'})
      return errorHandler(next, {code: 409})
    }

    team.playersId.push(user._id)
    team.playersCount++

    await team.save()
    await UserModel.findByIdAndUpdate(user._id, {team: team._id})

    sgMail.send({
      to: user.email,
      from: managerEmail,
      subject: `Congradulations you added to the team ${team.title}`,
      text: `Congradulations you added to the team ${team.title}`,
      html: `<strong>Congradulations you added to the team ${team.title}</strong>`
    })

    return res.status(200).json({data: {team, user}, message: 'User successfully approved'})
  } catch (err) {
    errorHandler(next)
  }
}

const deleteTeamById = async (req, res, next) => {
  try {
    const team = await TeamModel.findByIdAndDelete(req.params.id)

    return res.status(200).json({data: team, message: 'Team has been deleted'})
  } catch (err) {
    errorHandler(next)
  }
}

module.exports = {
  createTeam,
  getAllTeams,
  getTeamById,
  addManagerToTeam,
  requestToTeam,
  approveUserToTeam,
  deleteTeamById
}
