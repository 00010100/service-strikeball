const Validator = require('fastest-validator')

const v = new Validator({
  messages: {
    isMongoId: "The '{field}' must be type of mongoId"
  }
})

module.exports = (schema) => v.compile(schema)
