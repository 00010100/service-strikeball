const {roles} = require('../roles')
const {verifyToken} = require('../utils')
const {UserModel} = require('../models')
const wrap = require('./wrap')

/**
 *  Check user permission
 *
 * @param action
 * @param resource
 */
const grantAccess = (action, resource) =>
  wrap(async (req, res, next) => {
    const permission = roles.can(req.user.role)[action](resource)

    if (!permission.granted) {
      throw {
        param: 'permission',
        message: "You don't have enough permission to perform this action"
      }
    }

    next()
  })

/**
 *  Check user access token
 *
 * @param req
 * @param res
 * @param next
 */

const isUserAuthorized = wrap(async (req, res, next) => {
  if (!req.headers['x-access-token']) return next()

  const accessToken = req.headers['x-access-token']
  const verified = verifyToken(accessToken)

  if (!verified) {
    throw {param: 'accessToken', message: 'Wrong access token'}
  }

  if (verified.exp < Date.now().valueOf() / 1000) {
    throw {param: 'accessToken', message: 'JWT token has expired, please login to obtain a new one'}
  }

  req.user = await UserModel.findById(verified.userId)

  next()
})

module.exports = {
  grantAccess,
  isUserAuthorized
}
