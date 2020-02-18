const {verifyToken} = require('../utils')

module.exports = {
  title: 'string',
  token: {
    type: 'custom',
    tokenExp: 'valid token',
    check(value, schema) {
      try {
        verifyToken(value)

        return true
      } catch (err) {
        return [{type: 'isValidToken', expected: schema.tokenExp, actual: value}]
      }
    }
  },
  role: {type: 'enum', values: ['player', 'manager', 'admin']}
}
