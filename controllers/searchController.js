require('dotenv').config()
const Ingredient = require('../models/Ingredient')
const { ingredientAPICall, 
        recipeAPICall, 
        searchIngredientsAPI, 
        ingredientInformationAPICall, 
        searchGroceryProductsAPICall,
        groceryProductInformationAPICall
    } = require('../utils/externalAPICalls')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')
const axios = require("axios");

//search ingredients, work in progress
const searchIngredients = async (req, res) => {

    // Set up variables. Destructure req.query
    const { search, upc, brand, category } = req.query
    const queryObject = {}

    // Construct query object
    if (!upc && !search && !brand) {
        throw new BadRequestError("No search terms provided")
    }

    queryObject.ingr = search


    //      Old one just in case
    // if (upc) {
    //     queryObject.upc = upc
    // } else {
    //     if (search) {
    //         queryObject.ingr = search
    //     }
    //     if (brand) {
    //         queryObject.brand = brand
    //     }
    // }

    // if (category) {
    //     queryObject.category = category
    // }

    // Call ingredient API
    //foodData = await ingredientAPICall(queryObject)

    foodData = await searchIngredientsAPI(queryObject);

    // If no results throw error
    if (foodData.totalResults == 0) {
        throw new NotFoundError(`No results found for search term '${queryObject.ingr}'`)
    }

    // Return data to frontend
    res.status(StatusCodes.OK).json({ foodData })
}
const searchIngredientInformation = async (req, res) => {
    const queryObject = {}

    const {
        params: { id: ingredientId }
    } = req

    queryObject.id = ingredientId

    if (isNaN(queryObject.id)) {

        throw new BadRequestError("ID parameter is not a number")
    }

    ingredientData = await ingredientInformationAPICall(queryObject)

    if (!ingredientData) {
        throw new NotFoundError(`No results found with id ${queryObject.id}`)
    }

    res.status(StatusCodes.OK).json({ ingredientData })

}
const searchGroceryProducts = async (req, res) => {
    const queryObject = {}

    const { search } = req.query

    // Construct query object
    if (!search) {
        throw new BadRequestError("No search term provided")
    }

    queryObject.ingr = search

    productData = await searchGroceryProductsAPICall(queryObject);

    if (productData.totalProducts == 0) {
        throw new NotFoundError(`No results found for search term '${queryObject.ingr}'`)
    }

    // Return data to frontend
    res.status(StatusCodes.OK).json({ productData })
}
const searchGroceryProductInformation = async (req, res) => {
    queryObject = {}
    productData = await searchGroceryProductsAPICall(queryObject)
    res.send("Hello world 1")
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
    searchIngredientInformation,
    searchGroceryProducts
}