const {logger} = require('../utils')

const singleError = (error) => {
  if (error instanceof Error) {
    logger.error(error)
    return {message: 'Internal server error oqued'}
  }

  if (!(error.message && error.param)) {
    logger.error(error)
    return {message: 'Unknown server error oqued'}
  }

  return error
}

const errorBuilder = (errors) => {
  if (Array.isArray(errors)) {
    const errorArray = []

    for (let error of errors) {
      errorArray.push(singleError(error))
    }

    return errorArray
  }

  return [singleError(errors)]
}

const wrap = (middleware, name) => async (req, res, next) => {
  try {
    return await middleware(req, res, next)
  } catch (error) {
    if (name || middleware.name) {
      logger.error('In %s', name || middleware.name)
    }

    logger.error(errorBuilder(error))

    if (error.stack) {
      logger.error('%s', error.stack)
    }

    return next(errorBuilder(error))
  }
}

module.exports = wrap
