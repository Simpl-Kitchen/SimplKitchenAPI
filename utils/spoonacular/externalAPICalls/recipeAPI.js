const axios = require("axios");

const { createSearchOptions } = require('../createSearchOptions')

const searchRecipesAPI = async (queryObject) => {


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
    return searchResults
}

const searchRecipesByIngredientsAPI = async (queryObject) => {
    console.log("Whats good")
    console.log(queryObject.number)
    console.log(queryObject.random)
    let opts = {
        'ingredients': queryObject.ingredients,
        'limitLicense': true,
        'ranking': 1,
        'number': !queryObject.number? 5: queryObject.number,
        'ignorePantry': false,
        'intolerances': queryObject.intolerances,
        'random': !queryObject.random? false: true
    };

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
        return response.data
    }).catch(function (error) {
        console.error(error);
    });

    return searchResults

}
const searchRecipeInformationAPI = async (queryObject) => {

    const id = queryObject.id // Number | The item's id.
    let requestHeaders = {
        'x-api-key': process.env.SPOONACULAR_API_KEY
    }

    //console.log(id)

    const options = {
        method: 'GET',
        headers: requestHeaders,
        url: `https://api.spoonacular.com/recipes/${id}/information`,
    };

    const searchResults = axios.request(options).then(function (response) {
        return response.data
    }).catch(function (error) {
        console.error(error);
    });

    return searchResults
}

module.exports = { 
    searchRecipesAPI, 
    searchRecipesByIngredientsAPI, 
    searchRecipeInformationAPI 
}