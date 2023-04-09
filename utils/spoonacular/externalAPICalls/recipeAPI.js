const axios = require("axios");

// Search options utility for converting query object to Spoonacular API options
const { createSearchOptions } = require('../createSearchOptions')

// Spoonacular error handling
// const SpoonacularError = require('../../../errors/spoonacular');

const searchRecipesAPI = async (queryObject) => {

    //console.log(queryObject);

    let opts = createSearchOptions(queryObject, 'recipes')

    let requestHeaders = {
        'x-api-key': process.env.SPOONACULAR_API_KEY
    }

    const options = {
        method: 'GET',
        headers: requestHeaders,
        url: 'https://api.spoonacular.com/recipes/complexSearch',
        params: opts,
    };


    const searchResults = axios.request(options).then(function (response) {
        return response.data
    }).catch(function (error) {
        console.error(error);
    });
    //console.log(searchResults)
    return searchResults
}

module.exports = { searchRecipesAPI }