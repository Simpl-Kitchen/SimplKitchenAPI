require('dotenv').config()
const ingredientAPICAll = require('../utils/apiCalls')
const { StatusCodes } = require('http-status-codes')
const axios = require("axios");


const searchIngredients = async (req, res) => {
    
    // Set up variables. Destructure req.query
    const { search, upc } = req.query
    const queryObject = {}

    // Construct query obbject
    queryObject.app_id = process.env.INGREDIENT_APP_ID
    queryObject.app_key = process.env.INGREDIENT_APP_KEY
    
    if (upc) {
        queryObject.upc = upc
    } else if (search) {
        queryObject.ingr = search
    }

    // Call ingredient API
    foodData = await ingredientAPICAll(queryObject)

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