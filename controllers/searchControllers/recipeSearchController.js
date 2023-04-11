//const externalAPICalls = require('../utils/externalAPICalls')
const externalAPICalls = require('../../utils/spoonacular/externalAPICalls')
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

    // Get user intolerances
    const intolerances = await userHelpers.getUserIntolerances(userId)

    // Construct query object
    queryObject.search = search
    queryObject.intolerances = intolerances

    // Call ingredient API
    recipeData = await externalAPICalls.searchRecipesAPI(queryObject)

    // Return data to frontend
    res.status(StatusCodes.OK).json({ recipeData })
}
const generateRecipes = async (req, res) => {
    //console.log("Hello")

    // Set up variables. Destructure req.query and req.user
    const { search } = req.query
    const { userId } = req.user
    const queryObject = {}
    
    // Get user intolerances
    const intolerances = await userHelpers.getUserIntolerances(userId)
    const ingredients = await userHelpers.getUserIngredients(userId)

    queryObject.intolerances = intolerances
    queryObject.ingredients = ingredients

    const recipeData = await externalAPICalls.searchRecipesByIngredientsAPI(queryObject)

    res.status(StatusCodes.OK).json({ recipeData })


}



module.exports = {
    searchRecipes,
    generateRecipes
}