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
  return res.status(400).send(err)
}
