const {authValidate, userValidate} = require('../validator')
const {authAction, userAction} = require('../actions')

const {wrap} = require('../middlewares')

const signUp = wrap(async (req, res) => {
  const data = await authValidate.signUp(req.body)
  const result = await authAction.signUp(data)

  res.send(result)
})

const login = wrap(async (req, res) => {
  const data = await authValidate.login(req.body)
  const result = await authAction.login(data)

  res.send(result)
})

const getAllUsers = wrap(async (req, res) => {
  const result = await userAction.getUsers()

  res.send(result)
})

const getUserById = wrap(async (req, res) => {
  const result = await userValidate.getById(req.params)

  res.send(result)
})

const deleteUserById = wrap(async (req, res) => {
  const data = await userValidate.getById(req.params)
  const result = await userAction.deleteById(data)

  res.send(result)
})

// const confirmationUserEmail = async (req, res, next) => {
//   try {
//     const verified = verifyToken(req.params.token)

//     if (!verified) {
//       return errorHandler(next, {code: 404})
//     }

//     const user = await UserModel.findById(verified.userId)

//     if (!user) {
//       // return res.status(404).json({error: 'User does not exist'})
//       return errorHandler(next, {code: 404})
//     }

//     if (user.confirmed) {
//       // return res.status(400).json({error: 'User already confimed'})
//       return errorHandler(next, {code: 400})
//     }

//     if (user.role === 'manager') {
//       await UserModel.updateOne({_id: verified.userId}, {confirmed: true})
//     }

//     res.status(200).json({data: user, message: 'This manager was confirmed'})
//   } catch (err) {
//     errorHandler(next)
//   }
// }

module.exports = {
  signUp,
  login,
  getAllUsers,
  getUserById,
  deleteUserById,
  // confirmationUserEmail
}
