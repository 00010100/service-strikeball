const {roles} = require('../roles')
const {verifyToken, errorHandler} = require('../utils')
const {UserModel} = require('../models')

/**
 *  Check user permission
 *
 * @param action
 * @param resource
 */
const grantAccess = (action, resource) => {
  return async (req, res, next) => {
    try {
      const permission = roles.can(req.user.role)[action](resource)

      if (!permission.granted) {
        // return res
        //   .status(403)
        //   .json({error: "You don't have enough permission to perform this action"})
        return errorHandler(next, {code: 403})
      }
      next()
    } catch (error) {
      errorHandler(next)
    }
  }
}

/**
 *  Check user access token
 *
 * @param req
 * @param res
 * @param next
 */
const isUserAuthorized = async (req, res, next) => {
  if (!req.headers['x-access-token']) return next()

  try {
    const accessToken = req.headers['x-access-token']
    console.log(accessToken)
    const verified = verifyToken(accessToken)

    if (!verified) {
      return errorHandler(next, {code: 404})
    }

    if (verified.exp < Date.now().valueOf() / 1000) {
      // return res
      //   .status(401)
      //   .json({error: 'JWT token has expired, please login to obtain a new one'})
      return errorHandler(next, {code: 401})
    }

    req.user = await UserModel.findById(verified.userId)

    next()
  } catch (err) {
    console.log(err)
    errorHandler(next)
  }
}

module.exports = {
  grantAccess,
  isUserAuthorized
}
