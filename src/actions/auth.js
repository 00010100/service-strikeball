const {UserModel} = require('../models')
const {createToken, hashPassword} = require('../utils')
const sgMail = require('../sendgrid')

const login = async (data) => {
  const {_id, email, role} = data

  const accessToken = createToken(_id)

  await UserModel.updateOne({_id}, {accessToken})

  return {email, role, accessToken}
}

const signUp = async (data) => {
  const {email, name, role, password, team} = data

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

  return {
    _id: newUser._id,
    email: newUser.email,
    name: newUser.name,
    team: newUser.team,
    role: newUser.role,
    confirmed: newUser.confirmed,
    blocked: newUser.blocked,
    accessToken
  }
}

module.exports = {
  login,
  signUp
}
