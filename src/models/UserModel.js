const mongoose = require('mongoose')

const {Schema} = mongoose

const UserSchema = new Schema(
  {
    email: {type: String, trim: true, required: true, unique: true},
    password: {type: String, required: true},
    name: {type: String},
    confirmed: {type: Boolean, default: false},
    team: {type: 'ObjectId', default: null},
    role: {type: String, default: 'player', enum: ['player', 'manager', 'admin']},
    accessToken: {type: String}
  },
  {
    timestamps: true
  }
)

const User = mongoose.model('user', UserSchema)

module.exports = User
