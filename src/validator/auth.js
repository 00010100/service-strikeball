const {UserModel} = require('../models')
const {validatePassword, validate, convertError} = require('../utils')
const schema = require('./validateSchema')

const login = async (data) => {
  const {email, password} = data
  const errorList = validate(schema.login)(data)

  if (Array.isArray(errorList)) {
    throw convertError(errorList)
  }

  const user = await UserModel.findOne({email})

  if (!user) {
    throw {param: 'email', message: 'User does not exist'}
  }

  const validPassword = await validatePassword(password, user.password)

  if (!validPassword) {
    throw {param: 'password', message: 'Password is not correct'}
  }

  if (user.role === 'manager' && !user.confirmed) {
    throw {param: 'confirmed', message: 'You need to be confirmed to access this route'}
  }

  return user
}

const signUp = async (data) => {
  const errorList = validate(schema.signUp)(data)

  if (Array.isArray(errorList)) {
    throw convertError(errorList)
  }

  const user = await UserModel.findOne({email: data.email})

  if (user) {
    throw {param: 'email', message: 'User already exist'}
  }

  return data
}

module.exports = {
  login,
  signUp
}
