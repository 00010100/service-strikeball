/**
 * Error handler.
 * Gives error status code and error message to closingHandler.
 *
 * @param next
 * @param error
 */
module.exports = (next, error = {code: 500}) => {
  const {code, message, ...body} = error

  switch (code) {
    case 400: {
      next({code: 400, message: message || 'Sent data is not valid', body})
      break
    }
    case 401: {
      next({code: 401, message: message || 'Unauthorized', body})
      break
    }
    case 403: {
      next({code: 403, message: message || 'Access denied', body})
      break
    }
    case 404: {
      next({code: 404, message: message || 'Information not found', body})
      break
    }
    case 409: {
      next({code: 409, message: message || 'Conflict. Data already exist', body})
      break
    }
    case 415: {
      next({code: 415, message: message || 'Unsupported media type', body})
      break
    }
    default: {
      next({code: code || 500, message: message || 'Ops... Something went wrong. Try later.', body})
    }
  }
}
