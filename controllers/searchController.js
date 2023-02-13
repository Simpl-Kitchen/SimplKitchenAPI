require('dotenv').config()
const {ingredientAPICall, recipeAPICall} = require('../utils/externalAPICalls')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')
const axios = require("axios");


const searchIngredients = async (req, res) => {
    
    // Set up variables. Destructure req.query
    const { search, upc, brand, category } = req.query
    const queryObject = {}

    // Construct query object
    queryObject.app_id = process.env.INGREDIENT_APP_ID
    queryObject.app_key = process.env.INGREDIENT_APP_KEY

    if (upc) {
        queryObject.upc = upc
    } else if (search || brand) {
        queryObject.ingr = search
        queryObject.brand = brand
    } else {
        console.log("No search terms. Throw error prob");
    }

    if (category){
        queryObject.category = category
    }

    // Call ingredient API
    foodData = await ingredientAPICall(queryObject)

    // Return data to frontend
    res.status(StatusCodes.OK).json({ foodData })
}

//Work in progress, currently searches API for chicken
const searchRecipes = async (req,res) => {
    //define params for easier use
    let APP_ID = req.params.RECIPE_APP_ID
    let APP_KEY = req.params.RECIPE_APP_KEY
    //query API 
    const response = await axios.get
    (`https://api.edamam.com/search?
    app_id=${APP_ID}
    &app_key=${APP_KEY}
    &q=chicken`)
    //export query response into json file, return json file
    res.json(response.data)
}

module.exports = {
    searchIngredients,
    searchRecipes,
}