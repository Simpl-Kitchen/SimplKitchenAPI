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

const searchRecipes = async (req,res) => {
    const options = {
        method: 'GET',
        url: 'https://edamam-recipe-search.p.rapidapi.com/search',
        params: {q: 'chicken'},
        headers: {
          'X-RapidAPI-Key': 'f5e8f88421msh08628268fb35cd4p1b9b22jsn7d5039579c42',
          'X-RapidAPI-Host': 'edamam-recipe-search.p.rapidapi.com'
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