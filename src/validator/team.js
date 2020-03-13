const {TeamModel, UserModel} = require('../models')
const {validate, convertError} = require('../utils')
const schema = require('./validateSchema')

const create = async (data) => {
  const errorList = validate(schema.title)(data)

  if (Array.isArray(errorList)) {
    throw convertError(errorList)
  }

  const team = await TeamModel.findOne({title: data.title})

  if (team) {
    throw {param: 'title', message: 'Team already exist'}
  }

  return data
}

const getById = async (data) => {
  const errorList = validate(schema.id)(data)

  if (Array.isArray(errorList)) {
    throw convertError(errorList)
  }

  const team = await TeamModel.findById(data.id)

  if (!team) {
    throw {param: 'id', message: 'Team does not exist'}
  }

  return team
}

const getPlayersByTeamId = async (data) => {
  const {team} = data

  if (!team) {
    throw {param: 'team id', message: 'Team does not exist'}
  }

  return team
}

const addManager = async ({body, user}) => {
  const errorList = validate(schema.title)(body)

  if (Array.isArray(errorList)) {
    throw convertError(errorList)
  }

  if (!user) {
    throw {param: 'user', message: 'User does not exist'}
  }

  if (user.role !== 'manager') {
    throw {param: 'role', message: 'This type of user cannot be added to team like manager'}
  }

  if (user.team) {
    throw {param: 'managerId', message: 'User already have team'}
  }

  const team = await TeamModel.findOne({title: body.title})

  if (!team) {
    throw {param: 'title', message: 'Team does not exist'}
  }

  if (team.managerId) {
    throw {param: 'managerId', message: 'Team already have manager'}
  }

  return {team, user}
}

const deleteById = async (data) => {
  const errorList = validate(schema.id)(data)

  if (Array.isArray(errorList)) {
    throw convertError(errorList)
  }

  const team = await TeamModel.findById(data.id)

  if (!team) {
    throw {param: 'id', message: 'Team does not exist'}
  }

  return team
}

module.exports = {
  create,
  getById,
  getPlayersByTeamId,
  addManager,
  deleteById
}
