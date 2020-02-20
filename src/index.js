const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')

require('dotenv').config()

const {auth, notFoundRoutePath, closingErrorHandler} = require('./middlewares')
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

if (process.env.NODE_ENV === 'development') {
  app.get('/apidoc', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'apidoc/index.html'))
  })
}

app.use(express.static(path.join(__dirname, '..', '/apidoc')));

app.use('/api/v1', routes)
app.use((req, res, next) => notFoundRoutePath(req, res, next, routes))
app.use(closingErrorHandler)


const port = process.env.PORT || 5000

app.listen(port, () => {
  console.info(`Server started at http://localhost:${port}`)
})
