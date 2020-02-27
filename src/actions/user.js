const R = require('ramda')
const {UserModel} = require('../models')
const {createToken} = require('../utils')
const sgMail = require('../sendgrid')

const getAll = async () => {
  const data = await UserModel.find()

  console.log(data)
  return data
}

module.exports = {
  getAll
}