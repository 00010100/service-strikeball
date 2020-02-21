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

    const {teamName, to} = req.body

    const manager = await UserModel.findOne({email: to})

    if (!manager) {
      return errorHandler(next, {code: 404})
    }

    const team = await TeamModel.findOne({title: teamName, managerId: manager._id})

    if (!team) {
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

module.exports = {
  getAll,
  getById,
  create,
  cancel
}
