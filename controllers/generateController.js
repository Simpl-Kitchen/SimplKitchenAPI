const externalAPICalls = require('../utils/spoonacular/externalAPICalls')
const userHelpers = require('../utils/helpers')

const RecipeQueue = require("../models/RecipeQueue")

const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

const generateNewQueue = async (req, res) => {
    console.log("Hello")

    // Set up variables. Destructure req.query and req.user
    // const { search } = req.query
    const { userId } = req.user
    //const queryObject = {}
    
    // // Get user intolerances
    const intolerances = await userHelpers.getUserIntolerances(userId)
    const ingredients = await userHelpers.getUserIngredients(userId)

    queryObject.intolerances = intolerances
    queryObject.ingredients = ingredients
    queryObject.number = 1

    const recipeData = await externalAPICalls.searchRecipesByIngredientsAPI(queryObject)

    await Promise.all(recipeData.map(async (recipe) => {
        recipe.createdBy = req.user.userId
        await RecipeQueue.create(recipe);
    }));
    

    res.status(StatusCodes.OK).json({ recipeData })

    //res.send("Ok")


}
const removeFromQueue = async (req, res) => {
    console.log("Hello from removeFromQueue")
    res.send("Ok")
}
const addToQueue = async (req, res) => {
    console.log("Hello from addToQueue")
    res.send("Ok")
}

module.exports = {
    generateNewQueue,
    removeFromQueue,
    addToQueue
}