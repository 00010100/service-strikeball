const mongoose = require('mongoose')

const {Schema, model} = mongoose

const UserSchema = new Schema(
  {
    email: {type: String, trim: true, required: true, unique: true, lowercase: true},
    password: {type: String, trim: true, required: true},
    name: {type: String, trim: true},
    confirmed: {type: Boolean, default: false},
    team: {type: 'ObjectId', default: null},
    role: {type: String, default: 'player', enum: ['player', 'manager', 'admin']},
    accessToken: {type: String},
    blocked: {type: Boolean, default: false}
  },
  {
    timestamps: true
  }
)

const User = model('user', UserSchema)

module.exports = User
