const {UserModel, RequestModel} = require('../models')

const create = async (data) => {
  const newRequest = new RequestModel(data)

  await newRequest.save()

  return newRequest
}

const cancel = async (data) => {
  await RequestModel.deleteOne({_id: data.id})

  return data.request
}

const update = async (data) => {
  const {
    id: _id,
    status,
    request: {type},
    user,
    team,
    swapTeam
  } = data

  await RequestModel.updateOne({_id}, {status})

  switch (type) {
    case 'join':
      team.playersId.push(user._id)
      team.playersCount++
      await team.save()
      await UserModel.updateOne({_id: user._id}, {team: team._id})
      break
    case 'leave':
      team.playersCount--
      team.playersId.pull(user._id)
      await team.save()
      await UserModel.updateOne({_id: user._id}, {team: null})
      break
    case 'change':
      team.playersCount--
      team.playersId.pull(user._id)
      await team.save()

      swapTeam.playersCount++
      swapTeam.playersId.push(user._id)
      await swapTeam.save()

      await UserModel.updateOne({_id: user._id}, {team: swapTeam._id})
      break
    default:
      throw {param: 'type', message: 'This type is not available'}
  }

  return await RequestModel.findById(_id)
}

module.exports = {
  create,
  cancel,
  update
}
