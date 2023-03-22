require('dotenv').config()
const Ingredient = require('../models/Ingredient')

const externalAPICalls = require('../utils/externalAPICalls')
const userHelpers = require('../utils/helpers/userHelpers')

const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

//search ingredients, work in progress
const searchIngredients = async (req, res) => {
    
    // Set up variables. Destructure req.query and req.user
    const {search} = req.query
    const {userId} = req.user
    const queryObject = {}

    // Get user intolerances
    //const userIntolerances = user.intolerances.toString()
    const intolerances = await userHelpers.getUserIntolerances(userId)

    if (!search) {
        throw new BadRequestError("No search term was provided")
    }
    
    // Construct query object
    queryObject.ingr = search
    //queryObject.intolerances = userIntolerances
    queryObject.intolerances = intolerances
    
    //foodData = await searchIngredientsAPI(queryObject);
    const foodData = await externalAPICalls.searchIngredientsAPI(queryObject);
    
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

    //ingredientData = await ingredientInformationAPICall(queryObject)
    const ingredientData = await externalAPICalls.ingredientInformationAPICall(queryObject)
    
    if (!ingredientData) {
        throw new NotFoundError(`No results found with id ${queryObject.id}`)
    }

    res.status(StatusCodes.OK).json({ ingredientData })

}
const searchGroceryProducts = async (req, res) => {
    
    // Set up variables. Destructure req.query and req.user
    const { search } = req.query
    const { userId } = req.user
    const queryObject = {}

    // If no search term provided throw error
    if (!search) {
        throw new BadRequestError("No search term provided")
    }

    // Construct query object
    queryObject.ingr = search

    //productData = await searchGroceryProductsAPICall(queryObject);
    // Call API for product data
    productData = await externalAPICalls.searchGroceryProductsAPICall(queryObject);

    // If no results throw error
    if (productData.totalProducts == 0) {
        throw new NotFoundError(`No results found for search term '${queryObject.ingr}'`)
    }

    // Return data to frontend
    res.status(StatusCodes.OK).json({ productData })
}
const searchGroceryProductInformation = async (req, res) => {
    const queryObject = {}

    const {
        params: { id: productId }
    } = req

    queryObject.id = productId

    if (isNaN(queryObject.id)) {

        throw new BadRequestError("ID parameter is not a number")
    }

    //productData = await groceryProductInformationAPICall(queryObject)
    productData = await externalAPICalls.groceryProductInformationAPICall(queryObject)
    if (!productData) {
        throw new NotFoundError(`No results found with id ${queryObject.id}`)
    }

    res.status(StatusCodes.OK).json({ productData })
}
const searchGroceryProductByUPC = async (req, res) => {
    const queryObject = {}

    console.log(req.params)
    const {
        params: { upc: productUpc }
    } = req

    queryObject.upc = productUpc

    console.log(queryObject.upc)
    if (isNaN(queryObject.upc)) {

        throw new BadRequestError("UPC parameter must be a number")
    }

    //productData = await searchByUpcAPICall(queryObject)
    productData = await externalAPICalls.searchByUpcAPICall(queryObject)

    if (!productData || productData.status == "failure") {
        throw new NotFoundError(`No results found with upc ${queryObject.upc}`)
    }

    res.status(StatusCodes.OK).json({ productData })
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
    searchGroceryProducts,
    searchGroceryProductInformation,
    searchGroceryProductByUPC
}