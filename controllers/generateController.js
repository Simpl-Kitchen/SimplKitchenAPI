const externalAPICalls = require('../utils/spoonacular/externalAPICalls')
const userHelpers = require('../utils/helpers')

const {fillQueue} = require('../utils/generateRecipes/queueUtils')

const RecipeQueue = require("../models/RecipeQueue")

const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

const generateNewQueue = async (req, res) => {
    console.log("Hello")

    await RecipeQueue.deleteMany({ createdBy: req.user.userId })

    // Set up variables. Destructure req.query and req.user
    // const { search } = req.query
    const { userId } = req.user
    //const queryObject = {}
    
    // // Get user intolerances and ingredients in the user's pantry
    const intolerances = await userHelpers.getUserIntolerances(userId)
    const ingredients = await userHelpers.getUserIngredients(userId)

    // set up queryObject
    queryObject.intolerances = intolerances
    queryObject.ingredients = ingredients
    //queryObject.number = 20
    queryObject.number = 5
    queryObject.random = true
    queryObject.userId = req.user.userId

    // Fill the queue according to the queryObject
    await fillQueue(queryObject)

    // Send message back to the frontend
    res.status(StatusCodes.OK).json({ msg: "Queue generated" })

}
const getQueue = async (req, res) => {
    queryObject = {
        createdBy: req.user.userId
    }


    let result = RecipeQueue.find(queryObject).sort({ createdAt: 1 }); // Add .sort({ createdAt: 1 }) here
    const recipes = await result

    const count = await RecipeQueue.countDocuments({createdBy: req.user.userId})
    console.log("Inside if statement, count == ", count)

    res.status(StatusCodes.OK).json({ queue: recipes })

}
const removeFromQueue = async (req, res) => {

    // Get user ID
    const { userId } = req.user
    //const queryObject = {}
    
    // Get user intolerances and ingredients in their pantry
    const intolerances = await userHelpers.getUserIntolerances(userId)
    const ingredients = await userHelpers.getUserIngredients(userId)

    queryObject.intolerances = intolerances
    queryObject.ingredients = ingredients
    queryObject.random = true
    queryObject.userId = userId

    console.log("Hello from removeFromQueue")

    // Find the recipe to delete by Mongo DB _id
    let recipe = await RecipeQueue.findOne({
        _id: req.params.id,
        //createdBy: req.user.userId
    })

    // If recipe doesn't exitst send a message
    if (!recipe) {
        throw new NotFoundError(`No recipe in the queue with id ${req.params.id}`)
    }

    // Remove the recipe
    await recipe.remove();

    // Fill the recipe queue
    await fillQueue(queryObject);

    res.status(StatusCodes.OK).send("Deleted")

}

module.exports = {
    generateNewQueue,
    removeFromQueue,
    getQueue
}