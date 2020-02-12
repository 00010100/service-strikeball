const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')

require('dotenv').config()

const middlewares = require('./middlewares')
const routes = require('./routes/route.js')

const app = express()

mongoose
  .connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log(`Connected to mongodb`))
  .catch((err) => console.log(`Error: ${err}`))

app.use(morgan('common'))
app.use(helmet())
app.use(cors())
app.use(express.json())

app.use(middlewares.isValidUser)

app.use('/api/v1', routes)
app.use(middlewares.notFound)
app.use(middlewares.errorHandler)

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`)
})
