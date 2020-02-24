const {UserModel} = require('../models')
const {
  hashPassword,
  validatePassword,
  createToken,
  verifyToken,
  errorHandler,
  validate
} = require('../utils')
const authValidate = require('../validator/auth')

const schemas = require('../schemas')
const sgMail = require('../sendgrid')
const {wrap} = require('../middlewares')

const signUp = async (req, res, next) => {
  await wrap(req, next, async () => {
    await authValidate.signUp(req.body)
  })
}

const login = async (req, res, next) => {
  console.log('HERE????', wrap)
  const a = await wrap(req, next, async () => {
    const data = await authValidate.login(req.body)

    console.log('data', data)
    return res.status(200).json(data)
  })
  console.log('HERE????')
  console.log('21312312312', a)
  return a
}

const getAllUsers = async (req, res, next) => {
  try {
    const users = await UserModel.find()

    res.status(200).json({data: users})
  } catch (err) {
    errorHandler(next)
  }
}

const getUserById = async (req, res, next) => {
  try {
    const isValid = validate(schemas.mongoIdSchema)(req.params)

    if (Array.isArray(isValid)) {
      return errorHandler(next, {code: 400})
    }

    const user = await UserModel.findById(req.params.id)

    if (!user) {
      // return res.status(404).json({error: 'User does not exist'})
      return errorHandler(next, {code: 404})
    }

    res.status(200).json({data: user})
  } catch (err) {
    errorHandler(next)
  }
}

const deleteUserById = async (req, res, next) => {
  try {
    const isValid = validate(schemas.mongoIdSchema)(req.params)

    if (Array.isArray(isValid)) {
      return errorHandler(next, {code: 400})
    }

    const user = await UserModel.findById(req.params.id)

    if (!user) {
      return errorHandler(next, {code: 404})
    }

    await UserModel.deleteOne({_id: req.params.id})

    res.status(200).json({data: user, message: 'User has been deleted'})
  } catch (err) {
    errorHandler(next)
  }
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
