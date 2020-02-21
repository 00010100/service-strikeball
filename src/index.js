const express = require('express')
const http = require('http')
const path = require('path')
const helmet = require('helmet')
const cors = require('cors')

require('dotenv').config()
require('./db')

const {auth, notFoundRoutePath, closingErrorHandler, requestLogger} = require('./middlewares')
const routes = require('./routes')
const {logger} = require('./utils')

const app = express()

const httpServer = http.createServer(app)

app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(requestLogger)

app.use(auth.isUserAuthorized)

if (process.env.NODE_ENV === 'development') {
  app.get('/apidoc', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'apidoc/index.html'))
  })
}

app.use(express.static(path.join(__dirname, '..', '/apidoc')))

app.use('/api/v1', routes)
app.use((req, res, next) => notFoundRoutePath(req, res, next))
app.use(closingErrorHandler)

const port = process.env.PORT || 5000

httpServer.listen(port, () => {
  logger.info(`Server started at http://localhost:${port}`)
})
