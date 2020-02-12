const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.hashPassword = async (password) => await bcrypt.hash(password, 10)

exports.validatePassword = async (plainPassword, hashedPassword) => await bcrypt.compare(plainPassword, hashedPassword)

exports.createToken = (userId) => jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: '1d'})

exports.verifyToken = (accessToken) => jwt.verify(accessToken, process.env.JWT_SECRET)
