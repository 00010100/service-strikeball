const {RequestModel} = require('../models')
const {wrap} = require('../middlewares')
const {requestValidate} = require('../validator')
const {requestAction} = require('../actions')

const getAll = wrap(async (req, res) => {
  res.send(await RequestModel.find())
})

const getById = wrap(async (req, res) => {
  const data = await requestValidate.getById(req.params)

  res.send(data)
})

const create = wrap(async (req, res) => {
  const data = await requestValidate.create(req)
  const result = await requestAction.create(data)

  res.send(result)
})

const cancel = wrap(async (req, res) => {
  const data = await requestValidate.cancel(req)
  const result = await requestAction.cancel(data)

  res.send(result)
})

const update = wrap(async (req, res) => {
  const data = await requestValidate.update({...req.body, ...req.params})

  let validData

  if (data.status === 'approved') {
    switch (data.request.type) {
      case 'join':
        validData = await requestValidate.updateJoin(data)
        break
      case 'leave':
        validData = await requestValidate.updateLeave(data)
        break
      case 'change':
        validData = await requestValidate.updateChange(data)
        break
      default:
        res.send([{param: 'type', message: 'This type is not available'}])
    }
  }

  const result = await requestAction.update({...data, ...validData})

  res.send(result)
})

module.exports = {
  getAll,
  getById,
  create,
  cancel,
  update
}
