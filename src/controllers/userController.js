const {UserModel} = require('../models')
const {verifyToken, errorHandler} = require('../utils')
const {authValidate, userValidate} = require('../validator')

const {wrap} = require('../middlewares')

const signUp = (req, res, next) => {
  wrap(req, res, next, async () => {
    const data = await authValidate.signUp(req.body)

    res.status(201).json(data)
  })
}

const login = (req, res, next) => {
  wrap(req, res, next, async () => {
    const data = await authValidate.login(req.body)

    res.status(200).json(data)
  })
}

const getAllUsers = (req, res, next) => {
  wrap(req, res, next, async () => {
    // TODO - change
    const data = await UserModel.find()

    res.status(200).json(data)
  })
}

const getUserById = (req, res, next) => {
  wrap(req, res, next, async () => {
    const data = await userValidate.getById(req.params)

    res.status(200).json(data)
  })
}

const deleteUserById = (req, res, next) => {
  wrap(req, res, next, async () => {
    const data = await userValidate.deleteById(req.params)

    res.status(200).json(data)
  })
}

const confirmationUserEmail = async (req, res, next) => {
  try {
    const verified = verifyToken(req.params.token)

    if (!verified) {
      return errorHandler(next, {code: 404})
    }

    const user = await UserModel.findById(verified.userId)

    if (!user) {
      // return res.status(404).json({error: 'User does not exist'})
      return errorHandler(next, {code: 404})
    }

    if (user.confirmed) {
      // return res.status(400).json({error: 'User already confimed'})
      return errorHandler(next, {code: 400})
    }

    if (user.role === 'manager') {
      await UserModel.updateOne({_id: verified.userId}, {confirmed: true})
    }

    res.status(200).json({data: user, message: 'This manager was confirmed'})
  } catch (err) {
    errorHandler(next)
  }
}

module.exports = {
  signUp,
  login,
  getAllUsers,
  getUserById,
  deleteUserById,
  confirmationUserEmail
}
