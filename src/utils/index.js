const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const hashPassword = async (password) => await bcrypt.hash(password, 10)

const validatePassword = async (plainPassword, hashedPassword) => await bcrypt.compare(plainPassword, hashedPassword)

const createToken = (userId) => jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: '1d'})

const verifyToken = (accessToken) => jwt.verify(accessToken, process.env.JWT_SECRET)

module.exports = {
  hashPassword,
  validatePassword,
  createToken,
  verifyToken
}
