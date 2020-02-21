const mongoose = require('mongoose')

const {Schema, model} = mongoose

const RequestSchema = new Schema(
  {
    title: {type: String, required: true, trim: true},
    status: {type: String, default: 'pending', enum: ['accepted', 'declined', 'pending']},
    from: {type: 'ObjectId'},
    to: {type: String, trim: true, required: true, lowercase: true},
    type: {type: String, enum: ['join', 'change', 'leave'], required: true}
  },
  {
    timestamps: true
  }
)

const Request = model('request', RequestSchema)

module.exports = Request
