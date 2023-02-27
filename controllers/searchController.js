require('dotenv').config()
const { ingredientAPICall, recipeAPICall } = require('../utils/externalAPICalls')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')
const axios = require("axios");

//search ingredients, work in progress
const searchIngredients = async (req, res) => {

    // Set up variables. Destructure req.query
    const { search, upc, brand, category } = req.query
    const queryObject = {}

    // Construct query object
    queryObject.app_id = process.env.INGREDIENT_APP_ID
    queryObject.app_key = process.env.INGREDIENT_APP_KEY


    if (!upc && !search && !brand) {
        throw new BadRequestError("No search terms provided")
    }

    if (upc) {
        queryObject.upc = upc
    } else {
        if (search) {
            queryObject.ingr = search
        }
        if (brand) {
            queryObject.brand = brand
        }
    }

    if (category) {
        queryObject.category = category
    }

    //console.log(queryObject);

    // Call ingredient API
    foodData = await ingredientAPICall(queryObject)

    // Return data to frontend
    res.status(StatusCodes.OK).json({ foodData })
}
const searchRecipes = async (req, res) => {
    const { q, type } = req.query
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
    recipeData = await recipeAPICall(queryObject)

    // Return data to frontend
    res.status(StatusCodes.OK).json({ recipeData })

    //original code, for reference
    //query API 
    // const response = await axios.get
    //     (`https://api.edamam.com/search?
    // app_id=${APP_ID}
    // &app_key=${APP_KEY}
    // &q=chicken`)
    // //export query response into json file, return json file
    // res.json(response.data)
}
//search through pantry db of user, I am unsure why this is here
// const searchPantryIngredients = async (req, res) => {
//     queryObject = {
//         createdBy: req.user.userId,
//         params: { name : label }
//     }
//     const ingredient = await Ingredient.find({
//         name : label,
//         createdBy: userId,
//     })
//     if (!ingredient) {
//         throw new NotFoundError(`No ingredient with ${label}`)

//     }
//     res.status(StatusCodes.OK).json({ ingredient })
// }

module.exports = {
    searchIngredients,
    searchRecipes,
}