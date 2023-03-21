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


module.exports = { updateIntolerances }