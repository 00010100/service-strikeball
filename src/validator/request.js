const {TeamModel, UserModel, RequestModel} = require('../models')
const {validate, convertError} = require('../utils')
const schema = require('./validateSchema')

const create = async ({body, user}) => {
  if (!user) {
    throw {param: 'user', message: 'User does not exist'}
  }

  if (user.role !== 'player') {
    throw {param: 'role', message: 'This type of user cannot create request'}
  }

  const errorList = validate(schema.createRequest)(body)

  if (Array.isArray(errorList)) {
    throw convertError(errorList)
  }

  const {teamName, to, type, swapTeamName} = body

  if (type === 'join' && user.team) {
    throw {param: 'type[join]', message: 'User already have a team'}
  }

  if (type === 'leave' && !user.team) {
    throw {param: 'type[leave]', message: 'User does not have a team'}
  }

  if (type === 'change' && teamName === swapTeamName) {
    throw {param: 'type[change]', message: 'Cannot change team to the same team'}
  }

  const manager = await UserModel.findOne({email: to})

  if (!manager) {
    throw {param: 'to', message: 'Manager does not exist'}
  }

  const team = await TeamModel.findOne({title: teamName})

  if (!team) {
    throw {param: 'teamName', message: 'Team does not exist'}
  }

  const swapTeam = await TeamModel.findOne({title: swapTeamName})

  if (type === 'change' && !swapTeam) {
    throw {param: 'swapTeamName', message: 'Team does not exist'}
  }

  return {...body, from: user.email}
}

const getById = async (data) => {
  const errorList = validate(schema.id)(data)

  if (Array.isArray(errorList)) {
    throw convertError(errorList)
  }

  const request = await RequestModel.findById(data.id)

  if (!request) {
    throw {param: 'id', message: 'Request does not exist'}
  }

  return request
}

const cancel = async ({params, user}) => {
  const errorList = validate(schema.id)(params)

  if (Array.isArray(errorList)) {
    throw convertError(errorList)
  }

  const {id} = params

  const request = await RequestModel.findById(id)

  if (!request || request.status !== 'pending') {
    throw {param: 'status', message: 'Request already approved/declined'}
  }

  if (request.from !== user.email) {
    throw {param: 'from', message: 'Access denied'}
  }

  return {request, id}
}

const update = async (data) => {
  const {status, id} = data

  const errorList = validate(schema.updateRequest)({status, id})

  if (Array.isArray(errorList)) {
    throw convertError(errorList)
  }

  const request = await RequestModel.findById(id)

  if (!request || request.status !== 'pending') {
    throw {param: 'status', message: 'Request already approved/declined'}
  }

  return {request, ...data}
}

const updateJoin = async (data) => {
  const {request} = data

  const user = await UserModel.findOne({email: request.from})

  if (!user) {
    throw {param: 'from', message: 'User does not exist'}
  }

  if (user.team) {
    throw {param: 'team', message: 'User already have a team'}
  }

  const team = await TeamModel.findOne({title: request.teamName})

  if (!team) {
    throw {param: 'team', message: 'Team does not exist'}
  }

  if (team.playersId.includes(user._id)) {
    throw {param: 'playersId', message: 'User already in team'}
  }

  if (team.playersCount === 10) {
    throw {param: 'playersCount', message: 'Team already full'}
  }

  // team.playersId.push(user._id)
  // team.playersCount++
  // await team.save()
  // await UserModel.updateOne({_id: user._id}, {team: team._id})
  return {team, user}
}

const updateLeave = async (data) => {
  const {request, id} = data

  const user = await UserModel.findOne({email: request.from})

  if (!user) {
    throw {param: 'from', message: 'User does not exist'}
  }

  if (!user.team) {
    throw {param: 'team', message: 'User does not have a team'}
  }

  const team = await TeamModel.findOne({_id: user.team})

  if (!team) {
    throw {param: 'team', message: 'Team does not exist'}
  }

  if (!team.playersId.includes(user._id)) {
    throw {param: 'playersId', message: 'User does not have a team'}
  }

  return {team, user}

  // team.playersCount--
  // team.playersId.pull(user._id)
  // await team.save()
  // await UserModel.updateOne({_id: user._id}, {team: null})
}

const updateChange = async (data) => {
  console.log('here!"№')
  const {request, id} = data

  const user = await UserModel.findOne({email: request.from})

  if (!user) {
    throw {param: 'from', message: 'User does not exist'}
  }

  if (!user.team) {
    throw {param: 'team', message: 'User does not have a team'}
  }

  const team = await TeamModel.findOne({_id: user.team})

  if (!team) {
    throw {param: 'team', message: 'Team does not exist'}
  }

  if (!team.playersId.includes(user._id)) {
    throw {param: 'playersId', message: 'User does not have a team'}
  }

  const swapTeam = await TeamModel.findOne({title: request.swapTeamName})

  if (!swapTeam) {
    throw {param: 'swapTeamName', message: 'Team does not exist'}
  }

  if (!swapTeam.managerId) {
    throw {param: 'managerId', message: 'Team does not have a manager'}
  }

  if (swapTeam.playersCount === 10) {
    throw {params: 'playersCount', message: 'Team already full'}
  }

  return {team, swapTeam, user}

  // team.playersCount--
  // team.playersId.pull(user._id)
  // await team.save()

  // swapTeam.playersCount++
  // swapTeam.playersId.push(user._id)
  // await swapTeam.save()

  // await UserModel.updateOne({_id: user._id}, {team: swapTeam._id})
}

// const update = async ({status, id}) => {
//   const errorList = validate(schema.requestUpdate)({status, id})

//   if (Array.isArray(errorList)) {
//     throw convertError(errorList)
//   }

//   const request = await RequestModel.findById(id)

//   if (!request || request.status !== 'pending') {
//     throw {param: 'status', message: 'Request already approved/declined'}
//   }

//   await RequestModel.updateOne({_id: id}, {status})

//   if (status === 'approved') {
//     switch (request.type) {
//       case 'join': {
//         const user = await UserModel.findOne({email: request.from})

//         if (!user) {
//           throw {param: 'from', message: 'User does not exist'}
//         }

//         if (user.team) {
//           throw {param: 'team', message: 'User already have a team'}
//         }

//         const team = await TeamModel.findOne({title: request.teamName})

//         if (!team) {
//           throw {param: 'team', message: 'Team does not exist'}
//         }

//         if (team.playersId.includes(user._id)) {
//           throw {param: 'playersId', message: 'User already in team'}
//         }

//         if (team.playersCount === 10) {
//           throw {param: 'playersCount', message: 'Team already full'}
//         }

//         team.playersId.push(user._id)
//         team.playersCount++
//         await team.save()
//         await UserModel.updateOne({_id: user._id}, {team: team._id})

//         break
//       }
//       case 'leave': {
//         const user = await UserModel.findOne({email: request.from})

//         if (!user) {
//           throw {param: 'from', message: 'User does not exist'}
//         }

//         if (!user.team) {
//           throw {param: 'team', message: 'User does not have a team'}
//         }

//         const team = await TeamModel.findOne({_id: user.team})

//         if (!team) {
//           throw {param: 'team', message: 'Team does not exist'}
//         }

//         if (!team.playersId.includes(user._id)) {
//           throw {param: 'playersId', message: 'User does not have a team'}
//         }

//         team.playersCount--
//         team.playersId.pull(user._id)
//         await team.save()
//         await UserModel.updateOne({_id: user._id}, {team: null})

//         break
//       }
//       case 'change': {
//         const user = await UserModel.findOne({email: request.from})

//         if (!user) {
//           throw {param: 'from', message: 'User does not exist'}
//         }

//         if (!user.team) {
//           throw {param: 'team', message: 'User does not have a team'}
//         }

//         const team = await TeamModel.findOne({_id: user.team})

//         if (!team) {
//           throw {param: 'team', message: 'Team does not exist'}
//         }

//         if (!team.playersId.includes(user._id)) {
//           throw {param: 'playersId', message: 'User does not have a team'}
//         }

//         const swapTeam = await TeamModel.findOne({title: request.swapTeamName})

//         if (!swapTeam) {
//           throw {param: 'swapTeamName', message: 'Team does not exist'}
//         }

//         if (!swapTeam.managerId) {
//           throw {param: 'managerId', message: 'Team does not have a manager'}
//         }

//         if (swapTeam.playersCount === 10) {
//           throw {params: 'playersCount', message: 'Team already full'}
//         }

//         team.playersCount--
//         team.playersId.pull(user._id)
//         await team.save()

//         swapTeam.playersCount++
//         swapTeam.playersId.push(user._id)
//         await swapTeam.save()

//         await UserModel.updateOne({_id: user._id}, {team: swapTeam._id})

//         break
//       }
//     }
//   } else {
//   }

//   return await RequestModel.findById(id)
// }

module.exports = {
  create,
  getById,
  cancel,
  update,
  updateJoin,
  updateLeave,
  updateChange
}
