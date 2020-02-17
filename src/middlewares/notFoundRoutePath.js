const {parseRoutesPath} = require('../utils')

/**
 *  Throws error when route not found
 *
 * @param req
 * @param res
 * @param next
 * @param routes
 */

module.exports = (req, res, next, routes) => {
  const response = {
    code: 404,
    message: `Not Found - ${req.originalUrl}`
  }

  if (process.env.NODE_ENV === 'development') {
    response.routes = parseRoutesPath(routes)
  }

  next(response)
}
