const {
  validatePassword,
  hashPassword,
  createToken,
  verifyToken,
  parseRoutesPath
} = require('./common')
const errorHandler = require('./errorHandler')
const validate = require('./validate')
const logger = require('./logger')

module.exports = {
  validatePassword,
  hashPassword,
  createToken,
  verifyToken,
  parseRoutesPath,
  errorHandler,
  validate,
  logger
}
