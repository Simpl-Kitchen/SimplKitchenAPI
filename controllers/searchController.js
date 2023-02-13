require('dotenv').config()
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

    const options = {
        method: 'GET',
        url: process.env.URL,
        //params: { ingr: search },
        params: queryObject,
        headers: {
            'X-RapidAPI-Key': process.env.X_RAPIDAPI_KEY,
            'X-RapidAPI-Host': process.env.X_RAPIDAPI_HOST
        }
    };


    const searchResults = axios.request(options).then(function (response) {
        const data = []
        foodData = response.data.hints
        for (let i = 0; i < foodData.length; i++) {
            const { food } = response.data.hints[i]
            data.push(food)
        }
        return data
    }).catch(function (error) {
        console.error(error);
    });

    foodData = await searchResults
    res.status(StatusCodes.OK).json({ foodData })
    //console.log(foodData);
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