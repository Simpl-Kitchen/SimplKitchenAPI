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
    
    // // Get user intolerances
    const intolerances = await userHelpers.getUserIntolerances(userId)
    const ingredients = await userHelpers.getUserIngredients(userId)

    queryObject.intolerances = intolerances
    queryObject.ingredients = ingredients
    queryObject.number = 20
    queryObject.random = true
    queryObject.userId = req.user.userId

    //const recipeData = await externalAPICalls.searchRecipesByIngredientsAPI(queryObject)

    await fillQueue(queryObject)

    // await Promise.all(recipeData.map(async (recipe) => {
    //     recipe.createdBy = req.user.userId
    //     await RecipeQueue.create(recipe);
    // }));

    //console.log()
    

    res.status(StatusCodes.OK).json({ msg: "Queue generated" })

    //res.send("Ok")


}
const getQueue = async (req, res) => {
    queryObject = {
        createdBy: req.user.userId
    }
    //let result = RecipeQueue.find(queryObject)
    let result = RecipeQueue.find(queryObject).sort({ createdAt: 1 }); // Add .sort({ createdAt: 1 }) here
    const recipes = await result

    const count = await RecipeQueue.countDocuments({createdBy: req.user.userId})
    console.log("Inside if statement, count == ", count)

    res.status(StatusCodes.OK).json({ recipes })
    // console.log("Hello from getQueue")
    // res.send("Ok")

}
const removeFromQueue = async (req, res) => {

    const { userId } = req.user
    //const queryObject = {}
    
    // // Get user intolerances
    const intolerances = await userHelpers.getUserIntolerances(userId)
    const ingredients = await userHelpers.getUserIngredients(userId)

    queryObject.intolerances = intolerances
    queryObject.ingredients = ingredients
    //queryObject.number = 20
    queryObject.random = true
    queryObject.userId = userId

    //console.log(req.params.id)
    console.log("Hello from removeFromQueue")
    //res.send("Ok")

    let recipe = await RecipeQueue.findOne({
        _id: req.params.id,
        //createdBy: req.user.userId
    })

    if (!recipe) {
        throw new NotFoundError(`No recipe in the queue with id ${req.params.id}`)
    }


    await recipe.remove();
    await fillQueue(queryObject);

    res.status(StatusCodes.OK).send("Deleted")

    //res.status(StatusCodes.OK).json( { newRecipeData })
}
// const addToQueue = async (req, res) => {
//     console.log("Hello from addToQueue")


//     const intolerances = await userHelpers.getUserIntolerances(userId)
//     const ingredients = await userHelpers.getUserIngredients(userId)

//     queryObject.intolerances = intolerances
//     queryObject.ingredients = ingredients
//     queryObject.number = 1
//     queryObject.random = true

//     const recipeData = await externalAPICalls.searchRecipesByIngredientsAPI(queryObject)

//     await Promise.all(recipeData.map(async (recipe) => {
//         recipe.createdBy = req.user.userId
//         await RecipeQueue.create(recipe);
//     }));

//     //res.status(StatusCodes.OK).json({ recipeData })
// }

module.exports = {
    generateNewQueue,
    removeFromQueue,
    //addToQueue,
    getQueue
}