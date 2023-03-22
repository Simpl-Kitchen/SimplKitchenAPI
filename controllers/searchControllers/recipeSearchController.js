//const externalAPICalls = require('../utils/externalAPICalls')
const externalAPICalls = require('../../utils/externalAPICalls')
const userHelpers = require('../../utils/helpers')

const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../../errors')

const searchRecipes = async (req, res) => {
    // Set up variables. Destructure req.query and req.user
    const {search} = req.query
    const {userId} = req.user
    const queryObject = {}

    // Construct query object

    if (!q) {
        throw new BadRequestError("No search terms provided")
    } else if (!type) {
        throw new BadRequestError("No Recipe type provided")
    } else {
        queryObject.q = q
        queryObject.type = type
    }

    // Call ingredient API
    //recipeData = await externalAPICalls.searchRecipesAPI(queryObject)
    recipeData = await externalAPICalls.searchRecipesAPI(queryObject)
    //recipeData = await recipeAPICall(queryObject)

    // Return data to frontend
    //res.status(StatusCodes.OK).json({ recipeData })
    res.send("Hello World")
}

module.exports = {
    searchRecipes,
}