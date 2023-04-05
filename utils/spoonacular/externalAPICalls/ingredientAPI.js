require('dotenv').config()

// Spoonacular connection, https://spoonacular.com/food-api/docs#Ingredient-Search
const connectSpoonacularApi = require('../../../connections/connectSpoonacular');
const api = connectSpoonacularApi(process.env.SPOONACULAR_API_KEY)
const { createSearchOptions } = require('../createSearchOptions')
// Spoonacular error handling
const SpoonacularError = require('../../../errors/spoonacular');

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
    });

    const searchResults = await promise
    return searchResults
}

// Call to Spoonacular Get Ingredient Information endpoint
const ingredientInformationAPICall = async (queryObject) => {
    let id = queryObject.id // Number | The item's id.

    let opts = {
        'amount': !queryObject.amount ? 1 : queryObject.amount, // Number | The amount of this ingredient.
        //'unit': "grams" // String | The unit for the given amount.
    };

    let promise = new Promise((resolve, reject) => {
        api.getIngredientInformation(id, opts, function (error, data, response) {
            if (error) {
                //reject(error);
                reject(new SpoonacularError(error.message, error.status));
            } else {
                resolve(data);
            }
        });
    }).catch((error) => {
        console.error(error);
    });

    const searchResults = await promise
    return searchResults
}

module.exports = { searchIngredientsAPI, ingredientInformationAPICall }