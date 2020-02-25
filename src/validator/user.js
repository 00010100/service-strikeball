const {UserModel} = require('../models')
const {validate, convertError} = require('../utils')
const schemas = require('../schemas')

const getById = async (data) => {
  console.log('GET BY ID USER')
  const errorList = validate(schemas.mongoIdSchema)(data)

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
  console.log('DELETE BY ID USER')
  const user = await getById(data)

  await UserModel.deleteOne({_id: user._id})

  return user
}

module.exports = {
  getById,
  deleteById
}
