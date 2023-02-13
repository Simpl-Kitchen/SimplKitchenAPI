require('dotenv').config()
const ingredientAPICAll = require('../utils/ingredientAPICall')
const { StatusCodes } = require('http-status-codes')
const axios = require("axios");


const searchIngredients = async (req, res) => {
    
    const { search, upc } = req.query
    const queryObject = {}


    if (upc) {
        queryObject.upc = upc
    } else if (search) {
        queryObject.ingr = search
    }

    console.log(queryObject);

    foodData = await ingredientAPICAll(queryObject)
    res.status(StatusCodes.OK).json({ foodData })
}

//Work in progress, currently searches API for chicken
const searchRecipes = async (req,res) => {
    //define params for easier use
    let APP_ID = req.params.RECIPE_ID
    let APP_KEY = req.params.RECIPE_URI
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