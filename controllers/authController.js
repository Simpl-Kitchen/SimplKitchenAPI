// Import Dependencies  
const User = require('../models/User')
const ShoppingList = require('../models/ShoppingList')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')


const register = async (req, res) => {

    const user = await User.create({ ...req.body })
    console.log(user);
    const token = user.createJWT()

    // Create a shopping list for the user when they register
    const shoppingList = await ShoppingList.create({ createdBy: user._id })
    await shoppingList.save()

    res
        .status(StatusCodes.CREATED)
        .json({ user: { firstName: user.firstName, lastName: user.lastName, username: user.username }, token })

}

const login = async (req, res) => {

    // Check to make sure structure of the request is correct. Requires an email and a password.
    const { email, password } = req.body
    // If no email or password provided throw an error
    if (!email || !password) {
        throw new BadRequestError('Please provide email and pasword')
    }

    // Attempt to find the User
    const user = await User.findOne({ email })
    // If there is no user with this email...
    if (!user) {
        throw new UnauthenticatedError('Invalid Credentials')
    }

    // Check to see if the provided password is correct
    const isPasswordCorrect = await user.comparePassword(password)
    // If not throw an error
    if (!isPasswordCorrect) {
        throw new UnauthenticatedError('Invalid Credentials')
    }

    const token = user.createJWT()
    res.status(StatusCodes.OK).json({ user: { username: user.username }, token })

}
// Exports 
module.exports = {
    register,
    login
}