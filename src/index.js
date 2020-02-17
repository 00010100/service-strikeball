const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')

require('dotenv').config()

const {auth, errorHandler} = require('./middlewares')
const routes = require('./routes/route.js')

const app = express()

mongoose
  .connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.info('Connected to mongodb'))
  .catch((err) => console.info(`Error: ${err}`))

app.use(morgan('common'))
app.use(helmet())
app.use(cors())
app.use(express.json())

app.use(auth.isUserAuthorized)

app.use('/api/v1', routes)
app.use(errorHandler.notFound)
app.use(errorHandler.errorHandler)

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.info(`Server started at http://localhost:${port}`)
})
