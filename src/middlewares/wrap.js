const singleError = (error) => {
  if (error instanceof Error) {
    console.log(JSON.stringify(error))
    return {message: 'Internal server error oqued'}
  }

  if (!(error.message && error.param)) {
    console.log(JSON.stringify(error))
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

const wrap = async (req, res, next, middleware) => {
  try {
    req.body = await middleware()
    // this.headerSet(req);
  } catch (err) {
    console.log(err)
    // this.headerSet(req);
    res.status(400).json(errorBuilder(err))
  }

  next && (await next())
}

module.exports = wrap
