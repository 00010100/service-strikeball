const singleError = (error) => {
  if (error instanceof Error) {
    console.log(JSON.stringify(error))
    return {message: 'Internal server error oqued'}
  } else if (!(error.message && error.param)) {
    console.log(JSON.stringify(error))
    return {message: 'Unknown server error oqued'}
  } else {
    return error
  }
}

const errorBuilder = (errors) => {
  if (Array.isArray(errors)) {
    const errorArray = []

    for (let error of errors) {
      errorArray.push(singleError(error))
    }

    return errorArray
  } else {
    return [singleError(errors)]
  }
}

const wrap = async (req, next, middleware) => {
  try {
    console.log(req)
    console.log(req.status)
    console.log(next)
    console.log(middleware)
    req.body = await middleware()
    // this.headerSet(req);
  } catch (err) {
    console.log('here', err)
    req.body = errorBuilder(err)
    req.status = 400

    console.log('HERERERE', req.body)
    // this.headerSet(req);
    return
  }

  console.log('here finally')

  next && (await next())
}

module.exports = wrap
