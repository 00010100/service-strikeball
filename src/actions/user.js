const {UserModel} = require('../models')

const getUsers = async () => {
  return await UserModel.find()
}

const deleteById = async (data) => {
  await UserModel.deleteOne({_id: data._id})

  return data
}

module.exports = {
  getUsers,
  deleteById
}
