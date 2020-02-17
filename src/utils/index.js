const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

hashPassword = async (password) => await bcrypt.hash(password, 10)

validatePassword = async (plainPassword, hashedPassword) => await bcrypt.compare(plainPassword, hashedPassword)

createToken = (userId) => jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: '1d'})

verifyToken = (accessToken) => jwt.verify(accessToken, process.env.JWT_SECRET)

module.exports = {
  hashPassword,
  validatePassword,
  createToken,
  verifyToken
}
