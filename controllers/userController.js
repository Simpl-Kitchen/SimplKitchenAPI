const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')

const updateIntolerances = async (req, res) => {

    const {
        user: { userId },
    } = req

    const user = await User.findByIdAndUpdate(
        { _id: userId },
        req.body,
        { new: true, runValidators: true }
    )

    // Add error handling

    res.status(StatusCodes.OK).json({ user })
}
const getUser = async (req, res) => {
    const user = await User.findById(req.user.userId)
    console.log(user)
    res.send("Ok")
    //res.status(StatusCodes.OK).json({ user })
}


module.exports = { updateIntolerances, getUser }