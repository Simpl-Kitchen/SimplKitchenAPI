// Will move the API call here
require('dotenv').config()
const axios = require("axios");


const ingredientAPICall = async (queryObject) => {
    
    const options = {
        method: 'GET',
        url: process.env.URL,
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

    return searchResults
}

module.exports = ingredientAPICall;