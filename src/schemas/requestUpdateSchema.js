const mongoIdSchema = require('./mongoIdSchema')

module.exports = {
  ...mongoIdSchema,
  status: {type: 'enum', values: ['approved', 'declined']},
}