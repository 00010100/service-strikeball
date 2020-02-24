/**
 *  Throws error to client
 *
 * @param err
 * @param req
 * @param res
 * @param next
 */

module.exports = (err, req, res, next) => {
  console.log('i dont need to be here')
  if (res.headersSent) return next(err)
  if (!err.code) return res.status(500).json(err)
  return res.status(err.code).json(err)
}
