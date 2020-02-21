const mongoose = require('mongoose')

const {Schema, model} = mongoose

const RequestSchema = new Schema(
  {
    title: {type: String, required: true, trim: true},
    status: {type: String, default: 'pending', enum: ['accepted', 'declined', 'pending']},
    from: {type: String, require: true},
    teamName: {type: String, required: true, trim: true},
    swapTeamName: {type: String, trim: true, default: null},
    to: {type: String, trim: true, required: true, lowercase: true},
    type: {type: String, enum: ['join', 'change', 'leave'], required: true}
  },
  {
    timestamps: true
  }
)

const Request = model('request', RequestSchema)

module.exports = Request
