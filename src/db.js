const mongoose = require('mongoose')
const {logger} = require('./utils')

mongoose
  .connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => logger.db('Connected to mongodb'))
  .catch((err) => logger.db(`Connection to db error timed out: ${err}`))
mongoose.set('useCreateIndex', true)
// mongoose.set('debug', true)

module.exports = mongoose
