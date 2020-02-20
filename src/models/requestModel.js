const mongoose = require('mongoose')

const {Schema, model} = mongoose

const RequestSchema = new Schema(
  {
    title: {type: String, required: true, trim: true},
    status: {type: String, default: 'pending', enum: ['accepted', 'declined', 'pending']},
    from: {type: 'ObjectId', required: true},
    to: {type: 'ObjectId', required: true},
    type: {type: String, enum: ['add', 'change', 'exit'], required: true}
  },
  {
    timestamps: true
  }
)

const Request = model('request', RequestSchema)

module.exports = Request
