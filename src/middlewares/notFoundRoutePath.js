/**
 *  Throws error when route not found
 *
 * @param req
 * @param res
 * @param next
 */

module.exports = (req, res, next) => {
  next({
    code: 404,
    message: `Not Found - ${req.originalUrl}`
  })
}
