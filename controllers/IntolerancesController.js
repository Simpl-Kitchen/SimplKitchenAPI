const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')

const updateIntolerances = async (req, res) => {
    // queryObject = {
    //     createdBy: req.user.userId
    // }
    // let result = Ingredient.find(queryObject)
    // const ingredients = await result

    // res.status(StatusCodes.OK).json({ ingredients })

    console.log("Hello world")
}


module.exports = { updateIntolerances }