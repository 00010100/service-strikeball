const {UserModel} = require('../models')
const {validatePassword, validate, convertError, createToken, hashPassword} = require('../utils')
const schema = require('./validateSchema')
const sgMail = require('../sendgrid')

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

  // change later

  const accessToken = createToken(user._id)

  await UserModel.updateOne({_id: user._id}, {accessToken})

  return {email: user.email, role: user.role, accessToken}
}

const signUp = async (data) => {
  const {email, name, role, password, team} = data

  const errorList = validate(schema.signUp)(data)

  if (Array.isArray(errorList)) {
    throw convertError(errorList)
  }
  const user = await UserModel.findOne({email})

  if (user) {
    throw {param: 'email', message: 'User already exist'}
  }

  const hashedPassword = await hashPassword(password)

  const newUser = new UserModel({email, name, password: hashedPassword, role, team})

  const accessToken = createToken(newUser._id)

  newUser.accessToken = accessToken

  await newUser.save()

  if (role === 'manager') {
    const link = `${process.env.SERVER}/auth/confirmation/${accessToken}`
    sgMail.send({
      to: 'e0001101004+admin@gmail.com',
      from: email,
      subject: 'Registration approvement',
      text: `Click link to approvement this user ${email}: <a target="_blank" href="${link}">${link}</a>`,
      html: `<strong>Click link to approvement this user ${email}: <a target="_blank" href="${link}">${link}</a></strong>`
    })
  }

  return {newUser, accessToken}
}

module.exports = {
  login,
  signUp
}
