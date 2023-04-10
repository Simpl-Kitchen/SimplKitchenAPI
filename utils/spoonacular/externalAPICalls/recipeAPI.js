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
        //console.log(options)
        return response.data
    }).catch(function (error) {
        console.error(error);
    });
    //console.log(searchResults)
    return searchResults
}

const searchRecipesByIngredientsAPI = async (queryObject) => {
    console.log("Whats good")
    //console.log(queryObject.intolerances.replace(/,/g, ', '))
    let opts = {
        'ingredients': queryObject.ingredients,
        'limitLicense': true,
        'ranking': 1,
        'number': 5,
        'ignorePantry': false,
        'intolerances': queryObject.intolerances 
    };

    console.log(opts)

    //let opts = createSearchOptions(queryObject, 'recipes_random')

    let requestHeaders = {
        'x-api-key': process.env.SPOONACULAR_API_KEY
    }

    const options = {
        method: 'GET',
        headers: requestHeaders,
        url: 'https://api.spoonacular.com/recipes/findByIngredients',
        params: opts,
    };

    const searchResults = axios.request(options).then(function (response) {
        console.log(options)
        return response.data
    }).catch(function (error) {
        console.error(error);
    });

    return searchResults

}

module.exports = { searchRecipesAPI, searchRecipesByIngredientsAPI }