require('dotenv').config()
const Ingredient = require('../models/Ingredient')
const { ingredientAPICall, recipeAPICall, searchIngredientsAPI, ingredientInformationAPICall } = require('../utils/externalAPICalls')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')
const axios = require("axios");

//search ingredients, work in progress
const searchIngredients = async (req, res) => {

    // Set up variables. Destructure req.query
    const { search, upc, brand, category } = req.query
    const queryObject = {}

    // Construct query object
    // queryObject.app_id = process.env.INGREDIENT_APP_ID
    // queryObject.app_key = process.env.INGREDIENT_APP_KEY


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

    // Call ingredient API
    //foodData = await ingredientAPICall(queryObject)

    foodData = await searchIngredientsAPI(queryObject);

    // If no results throw error
    if (!foodData) {
        throw new NotFoundError(`No results found`)
    }

    // Return data to frontend
    res.status(StatusCodes.OK).json({ foodData })
}
const getIngredientInformation = async (req, res) => {
    //const { id } = req.query
    const queryObject = {}

    const id = 1001
    queryObject.id = id

    ingredientData = await ingredientInformationAPICall(queryObject)

    if (!ingredientData) {
        throw new NotFoundError(`No results found`)
    }

    res.status(StatusCodes.OK).json({ingredientData})
    
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
}
const searchByPantry = async (req, res) => {
    //retrieve users ingredients
    queryObject = {
        createdBy: req.userId
    }
    let result = Ingredient.find(queryObject)
    const ingredients = await result
    // check for bad queries

    if (!queryObject) {
        throw new BadRequestError("No search terms provided")
    }

    // Call ingredient API
    recipeData = await recipeAPICall(ingredients.label)

    // Return data to frontend
    res.status(StatusCodes.OK).json({ recipeData })

}

module.exports = {
    searchIngredients,
    searchRecipes,
    searchByPantry,
    getIngredientInformation
}