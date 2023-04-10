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
        //'tags' : String(queryObject.intolerances.replace(',',' ')),
        //'tags' : queryObject.intolerances,
        'ranking': 1,
        'number': 10,
        'ignorePantry': true
    };


    //let opts = createSearchOptions(queryObject, 'recipes_random')

    let requestHeaders = {
        'x-api-key': process.env.SPOONACULAR_API_KEY
    }

    const options = {
        method: 'GET',
        headers: requestHeaders,
        url: 'https://api.spoonacular.com/recipes/random?number=1&tags=vegetarian,dessert',
        //params: opts,
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