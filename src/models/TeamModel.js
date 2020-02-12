const mongoose = require('mongoose')

const Schema = mongoose.Schema

const TeamSchema = new Schema(
  {
    title: {type: String, required: true},
    playersId: [{type: 'ObjectId', required: true, default: null}],
    playersCount: {type: Number, default: 0, max: 10},
    managerId: {type: 'ObjectId', default: null}
  },
  {
    timestamps: true
  }
)

const Team = mongoose.model('team', TeamSchema)

module.exports = Team
