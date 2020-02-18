const Validator = require('fastest-validator')

const v = new Validator({
  messages: {
    isMongoId: "The '{field}' must be equal to mongoId. Actual: {actual}",
    isValidToken: "The '{field}' must be valid. Actual: {actual}",
  }
})

module.exports = (schema) => v.compile(schema)
