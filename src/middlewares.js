const {roles} = require('./roles')
const {verifyToken} = require('./utils')
const {UserModel} = require('./models')

const grantAccess = (action, resource) => {
  return async (req, res, next) => {
    try {
      const permission = roles.can(req.user.role)[action](resource)

      console.log('permission', permission)
      if (!permission.granted) {
        return res.status(401).json({error: "You don't have enough permission to perform this action"})
      }
      next()
    } catch (error) {
      next(error)
    }
  }
}

const allowIfLoggedin = async (req, res, next) => {
  try {
    const user = res.locals.loggedInUser

    if (!user) return res.status(401).json({error: 'You need to be logged in to access this route'})

    req.user = user
    next()
  } catch (error) {
    next(error)
  }
}

const isValidUser = async (req, res, next) => {
  if (req.headers['x-access-token']) {
    const accessToken = req.headers['x-access-token']
    const {userId, exp} = await verifyToken(accessToken)

    if (exp < Date.now().valueOf() / 1000) {
      return res.status(401).json({error: 'JWT token has expired, please login to obtain a new one'})
    }

    res.locals.loggedInUser = await UserModel.findById(userId)
    next()
  } else {
    next()
  }
}

const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`)
  res.status(404)
  next(error)
}

const errorHandler = (error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode
  res.status(statusCode)
  res.json({
    message: error.message,
    stack: process.env.NODE_ENV === 'production' ? '' : error.stack
  })
}

module.exports = {
  notFound,
  errorHandler,
  allowIfLoggedin,
  grantAccess,
  isValidUser
}
