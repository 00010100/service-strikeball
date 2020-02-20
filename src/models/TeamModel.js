const mongoose = require('mongoose')

const {Schema, model} = mongoose

const TeamSchema = new Schema(
  {
    title: {type: String, required: true, trim: true, unique: true},
    playersId: [{type: 'ObjectId', required: true, default: null}],
    playersCount: {type: Number, default: 0, max: 10},
    managerId: {type: 'ObjectId', default: null}
  },
  {
    timestamps: true
  }
)

const Team = model('team', TeamSchema)

module.exports = Team
