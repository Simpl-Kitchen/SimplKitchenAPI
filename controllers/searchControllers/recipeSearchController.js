//const externalAPICalls = require('../utils/externalAPICalls')
const externalAPICalls = require('../../utils/externalAPICalls')
const userHelpers = require('../../utils/helpers')

const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../../errors')

const searchRecipes = async (req, res) => {
    // Set up variables. Destructure req.query and req.user
    const { search } = req.query
    const { userId } = req.user
    const queryObject = {}

    if (!search) {
        throw new BadRequestError("No search terms provided")
    }
    // Construct query object
    queryObject.search = search
    // Call ingredient API
    //recipeData = await externalAPICalls.searchRecipesAPI(queryObject)
    recipeData = await externalAPICalls.searchRecipesAPI(queryObject)
    //console.log(recipeData)

    // Return data to frontend
    res.status(StatusCodes.OK).json({ recipeData })
}

module.exports = {
    searchRecipes,
}