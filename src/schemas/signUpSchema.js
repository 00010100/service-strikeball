const loginSchema = require('./loginSchema')

module.exports = {
  ...loginSchema,
  name: 'string|optional',
  role: 'string|optional',
  team: 'string|optional'
}
