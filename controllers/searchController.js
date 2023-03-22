require('dotenv').config()
const Ingredient = require('../models/Ingredient')

const externalAPICalls = require('../utils/externalAPICalls')
const userHelpers = require('../utils/helpers/userHelpers')

const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

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
    queryObject.search = search

    // Call API for product data
    productData = await externalAPICalls.searchGroceryProductsAPICall(queryObject);

    // If no results throw error
    if (productData.totalProducts == 0) {
        throw new NotFoundError(`No results found for search term '${queryObject.search}'`)
    }

    // Return data to frontend
    res.status(StatusCodes.OK).json({ productData })
}
const searchGroceryProductInformation = async (req, res) => {
    
    // Set up variables. Destructure req.params and req.user
    const {
        params: { id: productId }
    } = req
    const queryObject = {}

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
    //recipeData = await externalAPICalls.searchRecipesAPI(queryObject)
    recipeData = await externalAPICalls.searchRecipesAPI(queryObject)
    //recipeData = await recipeAPICall(queryObject)

    // Return data to frontend
    //res.status(StatusCodes.OK).json({ recipeData })
    res.send("Hello World")
}

module.exports = {
    searchIngredients,
    searchRecipes,
    searchIngredientInformation,
    searchGroceryProducts,
    searchGroceryProductInformation,
    searchGroceryProductByUPC
}