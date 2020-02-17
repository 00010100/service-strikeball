const {UserModel} = require('../models')
const {hashPassword, validatePassword, createToken, verifyToken} = require('../utils')
const sgMail = require('../sendgrid')

const signUp = async (req, res, next) => {
  try {
    const {email, name, role, password, team} = req.body
    const hashedPassword = await hashPassword(password)

    const newUser = new UserModel({email, name, password: hashedPassword, role, team})

    const accessToken = createToken(newUser._id)

    newUser.accessToken = accessToken

    if (role === 'manager') {
      const link = `${process.env.SERVER}/confirmation/${accessToken}`
      sgMail.send({
        to: 'e0001101004+admin@gmail.com',
        from: email,
        subject: 'Registration approvement',
        text: `Click link to approvement this user ${email}: <a target="_blank" href="${link}">${link}</a>`,
        html: `<strong>Click link to approvement this user ${email}: <a target="_blank" href="${link}">${link}</a></strong>`
      })
    }

    await newUser.save()

    res.status(201).json({data: newUser, accessToken})
  } catch (err) {
    next(err)
  }
}

const login = async (req, res, next) => {
  try {
    const {email, password} = req.body

    const user = await UserModel.findOne({email})

    if (!user) {
      return res.status(404).json({error: 'Email does not exist'})
    }

    const validPassword = await validatePassword(password, user.password)

    if (!validPassword) {
      return res.status(400).json({error: 'Password is not correct'})
    }

    if (user.role === 'manager' && !user.confirmed) {
      return res.status(400).json({error: 'You need to be confirmed to access this route'})
    }

    const accessToken = createToken(user._id)

    await UserModel.findOneAndUpdate({_id: user._id}, {accessToken})

    res.status(200).json({data: {email: user.email, role: user.role}, accessToken})
  } catch (err) {
    next(err)
  }
}

const getAllUsers = async (req, res, next) => {
  try {
    const users = await UserModel.find()

    res.status(200).json({data: users})
  } catch (err) {
    next(err)
  }
}

const getUserById = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.params.id)

    if (!user) {
      return res.status(404).json({error: 'User does not exist'})
    }

    res.status(200).json({data: user})
  } catch (err) {
    next(err)
  }
}

const deleteUserById = async (req, res, next) => {
  try {
    const user = await UserModel.findByIdAndDelete(req.params.id)

    return res.status(200).json({data: user, message: 'User has been deleted'})
  } catch (err) {
    next(err)
  }
}

const confirmationUserEmail = async (req, res, next) => {
  try {
    const {userId} = verifyToken(req.params.token)

    const user = await UserModel.findById(userId)

    if (!user) {
      return res.status(404).json({error: 'User does not exist'})
    }

    if (user.confirmed) {
      return res.status(400).json({error: 'User already confimed'})
    }

    if (user.role === 'manager') {
      await UserModel.findOneAndUpdate({_id: userId}, {confirmed: true})
    }

    res.status(200).json({data: user, message: `This manager was confirmed`})
  } catch (err) {
    next(err)
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
