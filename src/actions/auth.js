const R = require('ramda')
const {UserModel} = require('../models')
const {createToken} = require('../utils')
const sgMail = require('../sendgrid')

const loginFree = ['_id', 'email', 'accessToken']
const signUpFree = [...loginFree, 'confirmed', 'team', 'role', 'blocked', 'name']

const login = async (data) => {
  const accessToken = createToken(data._id)

  await UserModel.updateOne({_id: data._id}, {accessToken})

  return R.pick(loginFree, {...data.toObject(), accessToken})
}

const signUp = async (data) => {
  const newUser = new UserModel(data)

  const accessToken = createToken(newUser._id)
  newUser.accessToken = accessToken

  await newUser.save()

  if (R.equals(data.role, 'manager')) {
    const link = `${process.env.SERVER}/auth/confirmation/${accessToken}`
    const {email} = data

    sgMail.send({
      to: 'e0001101004+admin@gmail.com',
      from: email,
      subject: 'Registration approvement',
      text: `Click link to approvement this user ${email}: <a target="_blank" href="${link}">${link}</a>`,
      html: `<strong>Click link to approvement this user ${email}: <a target="_blank" href="${link}">${link}</a></strong>`
    })
  }

  return R.pick(signUpFree, newUser)
}

module.exports = {
  login,
  signUp
}
