require('dotenv').config()

// Spoonacular connection, https://spoonacular.com/food-api/docs#Ingredient-Search
const connectSpoonacularApi = require('../../../connections/connectSpoonacular');
const api = connectSpoonacularApi(process.env.SPOONACULAR_API_KEY)
const { createSearchOptions } = require('../createSearchOptions')
// Spoonacular error handling
const SpoonacularError = require('../../../errors/spoonacular');
const axios = require('axios')

// Call to Spoonacular Ingredient Search endpoint
const searchIngredientsAPI = async (queryObject) => {

    //console.log(queryObject.intolerances)

    let opts = createSearchOptions(queryObject, 'ingredients')

    let promise = new Promise((resolve, reject) => {
        api.ingredientSearch(opts, function (error, data, response) {
            if (error) {
                reject(new SpoonacularError(error.message, error.status));
            } else {
                resolve(data);
            }
        });
    }).catch((error) => {
        console.error(error);
        console.log("IN THIS ONE")
    });

    const searchResults = await promise
    return searchResults
}

const ingredientInformationAPICall = async (queryObject) => {
    
    let id = queryObject.id // Number | The item's id.

    let opts = {
        'amount': !queryObject.amount ? 1 : queryObject.amount, // Number | The amount of this ingredient.
        'unit': queryObject.unit // String | The unit for the given amount.
    };

    let requestHeaders = {
        'x-api-key': process.env.SPOONACULAR_API_KEY
    }

    const options = {
        method: 'GET',
        headers: requestHeaders,
        url: `https://api.spoonacular.com/food/ingredients/${id}/information`,
        params: opts,
    };

    const searchResults = await axios.request(options).then(function (response) {
        return response.data
    }).catch(function (error) {
        console.log("ERROR")
        console.error(error);
        //console.error(error.response.data); // Log the error data from the API
    });
    //console.log(searchResults)
    return searchResults

}

module.exports = { searchIngredientsAPI, ingredientInformationAPICall }