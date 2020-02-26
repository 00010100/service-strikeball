const {UserModel} = require('../models')
const {validate, convertError} = require('../utils')
const schema = require('./validateSchema')

const getById = async (data) => {
  const errorList = validate(schema.id)(data)

  if (Array.isArray(errorList)) {
    throw convertError(errorList)
  }

  const user = await UserModel.findById(data.id)

  if (!user) {
    throw {param: 'id', message: 'User does not exist'}
  }

  return user
}

const deleteById = async (data) => {
  const user = await getById(data)

  await UserModel.deleteOne({_id: user._id})

  return user
}

module.exports = {
  getById,
  deleteById
}
