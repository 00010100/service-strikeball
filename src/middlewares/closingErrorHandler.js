/**
 *  Throws error to client
 *
 * @param err
 * @param req
 * @param res
 * @param next
 */

module.exports = (err, req, res, next) => {
  if (res.headersSent) return next(err)
  if (!err.code) return res.status(500).json(err)
  return res.status(err.code).json(err)
}
