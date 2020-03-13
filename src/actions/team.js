const {UserModel, TeamModel} = require('../models')

const getTeams = async () => {
  return await TeamModel.find()
}

const create = async (data) => {
  const newTeam = new TeamModel({title: data.title})

  await newTeam.save()

  return newTeam
}

const getPlayersByTeamId = async (data) => {
  return await TeamModel.find({team: data})
}

const addManager = async (data) => {
  const {team, user} = data

  await TeamModel.updateOne({_id: team._id}, {managerId: user._id})

  const updatedTeam = await TeamModel.findById(team._id)

  await UserModel.updateOne({_id: user._id}, {team: updatedTeam._id})

  return updatedTeam
}

const deleteById = async (data) => {
  await TeamModel.deleteOne({_id: data._id})

  return data
}

module.exports = {
  getTeams,
  create,
  getPlayersByTeamId,
  addManager,
  deleteById
}
