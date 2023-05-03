// Exports
const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')
// User CRUD functions 
const updateUser = async (req, res) => {

    const {
        user: { userId },
    } = req

    const user = await User.findByIdAndUpdate(
        { _id: userId },
        req.body,
        { new: true, runValidators: true }
    )

    res.status(StatusCodes.OK).json({ user })
}
const getUser = async (req, res) => {
    const user = await User.findById(req.user.userId)

    const userResponse = {
        intolerances: user.intolerances,
        diets: user.diets,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
    }
    res.status(StatusCodes.OK).json({ userResponse })
}

// Exports 
module.exports = { updateUser, getUser }