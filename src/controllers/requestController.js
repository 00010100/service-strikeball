const {RequestModel} = require('../models')
const {wrap} = require('../middlewares')
const {requestValidate} = require('../validator')

const getAll = wrap(async (req, res) => {
  res.send(await RequestModel.find())
})

const getById = wrap(async (req, res) => {
  const data = await requestValidate.getById(req.params)

  res.send(data)
})

const create = wrap(async (req, res) => {
  const data = await requestValidate.create(req)

  res.send(data)
})

const cancel = wrap(async (req, res) => {
  const data = await requestValidate.cancel(req)

  res.send(data)
})

const update = wrap(async (req, res) => {
  const data = await requestValidate.update({...req.body, ...req.params})

  res.send(data)
})

module.exports = {
  getAll,
  getById,
  create,
  cancel,
  update
}
