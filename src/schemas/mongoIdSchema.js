const mongoose = require('mongoose')

module.exports = {
  id: {
    type: 'custom',
    mongoId: mongoose.Types.ObjectId,
    check(value, schema) {
      const isValid = schema.mongoId.isValid(value)
      return !isValid ? [{type: 'isMongoId', expected: schema.mongoId.name, actual: value}] : true
    }
  }
}
