const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')

const updateIntolerances = async (req, res) => {


    const userID = req.user.userID;
    const user = await User.findOne({ userID })


    console.log(req.body)

    //console.log(req.user)
    console.log(user)

    console.log("Hello world")

    res.send('Hello World')
}


module.exports = { updateIntolerances }