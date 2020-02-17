const {roles} = require('../roles')
const {verifyToken} = require('../utils')
const {UserModel} = require('../models')

const grantAccess = (action, resource) => {
  return async (req, res, next) => {
    try {
      const permission = roles.can(req.user.role)[action](resource)

      console.log('permission', permission)
      if (!permission.granted) {
        return res
          .status(401)
          .json({error: "You don't have enough permission to perform this action"})
      }
      next()
    } catch (error) {
      next(error)
    }
  }
}

const isUserAuthorized = async (req, res, next) => {
  if (!req.headers['x-access-token']) return next()

  try {
    const accessToken = req.headers['x-access-token']
    const {userId, exp} = verifyToken(accessToken)

    if (exp < Date.now().valueOf() / 1000) {
      return res.status(401).json({error: 'JWT token has expired, please login to obtain a new one'})
    }

    req.user = await UserModel.findById(userId)

    next()
  } catch (err) {
    next(err)
  }
}

module.exports = {
  grantAccess,
  isUserAuthorized
}
