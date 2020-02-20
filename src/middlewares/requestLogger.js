const {logger} = require('../utils')

/**
 * Provide an ability to exclude logs
 *
 * @type {RegExp[]}
 */
const regexs = [/(.+)\.(js|css|woff.?|png|ico)$/g, /X_LOCAL_SECURITY_COOKIE/g]

/**
 * Provide an ability to exclude logs by urls
 *
 * @type {String[]}
 */
const urlsWithDisabledLogs = []

/**
 * Provide an ability to show logs on start of request
 *
 * @type {String[]}
 */
const urlsThatIsShowedOnStart = []

/**
 * Provide an ability to show logs without format
 *
 * @type {String[]}
 */
const devUrls = []

const writeLog = (log) => {
  logger.http(log)
}

/**
 * Middleware displays formatted request logs in console
 *
 * @param req
 * @param res
 * @param next
 */
const requestLogger = (req, res, next) => {
  const {method, originalUrl} = req
  const start = Date.now()
  const clientIp =
    req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddress

  if (regexs.some((x) => originalUrl.match(x))) {
    return next()
  }

  if (urlsWithDisabledLogs.some((x) => originalUrl.includes(x))) {
    return next()
  }

  if (devUrls.some((x) => originalUrl.includes(x))) {
    writeLog(`[${new Date().toISOString()}] - ${clientIp} - [DEV_LOG] ${method} ${originalUrl}`)
  }

  if (urlsThatIsShowedOnStart.some((x) => originalUrl.includes(x))) {
    writeLog(`${clientIp} - ${method} ${originalUrl} - Request started.`)
  }

  res.on('finish', () => {
    const {statusCode, statusMessage} = res
    const contentSize = res.get('Content-Length') || 0
    const responseTime = Date.now() - start
    const log = `${clientIp} - ${method} ${originalUrl} - ${statusCode} [${statusMessage}] (${contentSize}b sent in ${responseTime} ms)`
    writeLog(log)
  })

  return next()
}

module.exports = requestLogger
