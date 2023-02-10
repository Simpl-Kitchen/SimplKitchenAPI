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
        params: { ingr: search },
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

//Currently not working 
const searchRecipes = async (req,res) => {
    const { search, upc } = req.query
    const queryObject = {}
    //basic query for recipes with 'chicken' (rapid API test) Keys are expired I believe, using my own does not work, believe this is for V1
    //However recipes API V2 is out
    const options = {
        method: 'GET',
        url: process.env.RECIPE_URL,
        params: {q: 'chicken'},
        headers: {
            'app_id': process.env.RECIPE_ID,
            'X-RapidAPI-Key': process.env.RECIPE_URI,
            'X-RapidAPI-Host': 'https://api.edamam.com/api/recipes/v2'
        }
      };
      
      axios.request(options).then(function (response) {
          console.log(response.data);
      }).catch(function (error) {
          console.error(error);
      });
}

module.exports = {
    searchIngredients,
    searchRecipes,
}