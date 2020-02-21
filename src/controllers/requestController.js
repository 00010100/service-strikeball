const {RequestModel, TeamModel, UserModel} = require('../models')
const {errorHandler, validate} = require('../utils')
const schemas = require('../schemas')

const getAll = async (req, res, next) => {
  try {
    const request = await RequestModel.find()

    res.status(200).json({data: request})
  } catch (err) {
    errorHandler(next)
  }
}

const getById = async (req, res, next) => {
  try {
    const isValid = validate(schemas.mongoIdSchema)(req.params)

    if (Array.isArray(isValid)) {
      return errorHandler(next, {code: 400})
    }

    const request = await RequestModel.findById(req.params.id)

    if (!request) {
      return errorHandler(next, {code: 404})
    }

    res.status(200).json({data: request})
  } catch (err) {
    errorHandler(next)
  }
}

const create = async (req, res, next) => {
  try {
    if (req.user.role !== 'player') {
      return errorHandler(next, {code: 400})
    }

    const isValid = validate(schemas.requestCreateSchema)(req.body)

    if (Array.isArray(isValid)) {
      return errorHandler(next, {code: 400})
    }

    const {teamName, to, type, swapTeamName} = req.body

    if (type === 'join' && req.user.team) {
      return errorHandler(next, {code: 400})
    }

    if (type === 'leave' && !req.user.team) {
      return errorHandler(next, {code: 400})
    }

    if (type === 'change' && teamName === swapTeamName) {
      return errorHandler(next, {code: 400})
    }

    const manager = await UserModel.findOne({email: to})

    if (!manager) {
      return errorHandler(next, {code: 404})
    }

    const team = await TeamModel.findOne({title: teamName, managerId: manager._id})

    if (!team) {
      return errorHandler(next, {code: 404})
    }

    const swapTeam = await TeamModel.findOne({title: swapTeamName, managerId: manager._id})

    if (!swapTeam) {
      return errorHandler(next, {code: 404})
    }

    const data = {...req.body, from: req.user.email}

    const newRequest = new RequestModel(data)

    await newRequest.save()

    res.status(201).json({data: newRequest})
  } catch (err) {
    errorHandler(next)
  }
}

const cancel = async (req, res, next) => {
  try {
    const isValid = validate(schemas.mongoIdSchema)(req.params)

    if (Array.isArray(isValid)) {
      return errorHandler(next, {code: 400})
    }

    const {id} = req.params

    const request = await RequestModel.findById(id)

    if (!request || request.status !== 'pending') {
      return errorHandler(next, {code: 404})
    }

    if (request.from !== req.user.email) {
      return errorHandler(next, {code: 403})
    }

    await RequestModel.deleteOne({_id: id})

    res.status(200).json({data: request, message: 'Request successfully deleted'})
  } catch (err) {
    errorHandler(next)
  }
}

const update = async (req, res, next) => {
  try {
    const data = {
      ...req.body,
      ...req.params
    }
    const isValid = validate(schemas.requestUpdateSchema)(data)

    if (Array.isArray(isValid)) {
      return errorHandler(next, {code: 400})
    }

    const {status} = req.body

    const request = await RequestModel.findById(req.params.id)

    if (!request || request.status !== 'pending') {
      return errorHandler(next, {code: 404})
    }

    await RequestModel.updateOne({_id: req.params.id}, {status})

    if (status === 'approved') {
      switch (request.type) {
        case 'join': {
          const user = await UserModel.findOne({email: request.from})

          if (!user) {
            return errorHandler(next, {code: 404})
          }

          if (user.team) {
            return errorHandler(next, {code: 409})
          }

          const team = await TeamModel.findOne({title: request.teamName})

          if (!team) {
            return errorHandler(next, {code: 404})
          }

          if (team.playersId.includes(user._id)) {
            return errorHandler(next, {code: 409})
          }

          if (team.playersCount === 10) {
            return errorHandler(next, {code: 409})
          }

          team.playersId.push(user._id)
          team.playersCount++
          await team.save()
          await UserModel.updateOne({_id: user._id}, {team: team._id})

          break
        }
        case 'leave': {
          const user = await UserModel.findOne({email: request.from})

          if (!user) {
            return errorHandler(next, {code: 404})
          }

          if (!user.team) {
            return errorHandler(next, {code: 404})
          }

          const team = await TeamModel.findOne({_id: user.team})

          if (!team) {
            return errorHandler(next, {code: 404})
          }

          if (!team.playersId.includes(user._id)) {
            return errorHandler(next, {code: 404})
          }

          team.playersCount--
          team.playersId.pull(user._id)
          await team.save()

          break
        }
        case 'change': {
          const user = await UserModel.findOne({email: request.from})

          if (!user) {
            return errorHandler(next, {code: 404})
          }

          if (!user.team) {
            return errorHandler(next, {code: 404})
          }

          const team = await TeamModel.findOne({_id: user.team})

          if (!team) {
            return errorHandler(next, {code: 404})
          }

          if (!team.playersId.includes(user._id)) {
            return errorHandler(next, {code: 404})
          }

          const swapTeam = await TeamModel.findOne({title: request.swapTeamName})

          if (!swapTeam) {
            return errorHandler(next, {code: 404})
          }

          if (swapTeam.playersCount === 10) {
            return errorHandler(next, {code: 400})
          }

          team.playersCount--
          team.playersId.pull(user._id)
          await team.save()

          swapTeam.playersCount++
          swapTeam.playersId.push(user._id)
          await swapTeam.save()

          await UserModel.updateOne({_id: user._id}, {team: swapTeam._id})

          break
        }
      }
    }

    res.status(200).json({data: null, message: `Request successfully ${status}`})
  } catch (err) {
    errorHandler(next)
  }
}

module.exports = {
  getAll,
  getById,
  create,
  cancel,
  update
}
