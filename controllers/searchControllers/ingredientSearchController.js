const externalAPICalls = require('../utils/externalAPICalls')
const userHelpers = require('../../utils/helpers')

const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../../errors')

const searchIngredients = async (req, res) => {
    
    // Set up variables. Destructure req.query and req.user
    const {search} = req.query
    const {userId} = req.user
    const queryObject = {}

    // Get user intolerances
    const intolerances = await userHelpers.getUserIntolerances(userId)

    // If no search term provided throw error
    if (!search) {
        throw new BadRequestError("No search term was provided")
    }
    
    // Construct query object
    queryObject.search = search
    queryObject.intolerances = intolerances
    
    // Call API for ingredient data
    const foodData = await externalAPICalls.searchIngredientsAPI(queryObject);
    
    // If no results throw error
    if (foodData.totalResults == 0) {
        throw new NotFoundError(`No results found for search term '${queryObject.search}'`)
    }

    // Return data to frontend
    res.status(StatusCodes.OK).json({ foodData })
}
const searchIngredientInformation = async (req, res) => {
    
    // Set up variables. Destructure req.params and req.user
    const {
        params: { id: ingredientId }
    } = req
    const queryObject = {}

    // Construct query object
    queryObject.id = ingredientId

    // If id is not a number throw error
    if (isNaN(queryObject.id)) {

        throw new BadRequestError("ID parameter is not a number")
    }

    // Call API for ingredient data
    const ingredientData = await externalAPICalls.ingredientInformationAPICall(queryObject)
    
    // If no results throw error
    if (!ingredientData) {
        throw new NotFoundError(`No results found with id ${queryObject.id}`)
    }

    // Return data to frontend
    res.status(StatusCodes.OK).json({ ingredientData })

}

module.exports = {
    searchIngredients,
    searchIngredientInformation
}