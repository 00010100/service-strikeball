const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const errorHandler = require('./errorHandler')

const hashPassword = async (password) => bcrypt.hash(password, 10)

const validatePassword = async (plainPassword, hashedPassword) =>
  bcrypt.compare(plainPassword, hashedPassword)

const createToken = (userId) => jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: '1d'})

const verifyToken = (accessToken) => {
  try {
    return jwt.verify(accessToken, process.env.JWT_SECRET)
  } catch (err) {
    return null
  }
}

const convertError = (list) => list.map(({field, message}) => ({param: field, message}))

module.exports = {
  hashPassword,
  validatePassword,
  createToken,
  verifyToken,
  convertError
}
