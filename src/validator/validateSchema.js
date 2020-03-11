const mongoose = require('mongoose')

const id = {
  id: {
    type: 'custom',
    mongoId: mongoose.Types.ObjectId,
    check(value, schema) {
      const isValid = schema.mongoId.isValid(value)
      return !isValid ? [{type: 'isMongoId', expected: schema.mongoId.name, actual: value}] : true
    }
  }
}

const login = {
  email: 'email',
  password: 'string|min:6'
}

module.exports = {
  login,
  signUp: {
    ...login,
    name: 'string|optional',
    role: 'string|optional',
    team: 'string|optional'
  },
  id,
  createRequest: {
    title: 'string',
    to: 'email',
    teamName: 'string',
    swapTeamName: 'string|optional',
    type: {type: 'enum', values: ['join', 'change', 'leave']}
  },
  updateRequest: {
    ...id,
    status: {type: 'enum', values: ['approved', 'declined']}
  },
  title: {
    title: 'string'
  }
}
