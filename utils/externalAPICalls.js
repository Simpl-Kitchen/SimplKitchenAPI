// Will move the API call here
require('dotenv').config()
const axios = require("axios");
const { search } = require('superagent');


// Spoonacular connection
const connectSpoonacularApi = require('../connections/connectSpoonacular')
const api = connectSpoonacularApi(process.env.SPOONACULAR_API_KEY)

// This returns all the data ** 

// const ingredientAPICall = async (queryObject) => {


//     queryObject.app_id = process.env.INGREDIENT_APP_ID
//     queryObject.app_key = process.env.INGREDIENT_APP_KEY
//     //console.log(queryObject);

//     const options = {
//         method: 'GET',
//         url: 'https://api.edamam.com/api/food-database/v2/parser',
//         params: queryObject,
//     };

//     const searchResults = axios.request(options).then(function (response) {
//         return response.data
//     }).catch(function (error) {
//         console.error(error);
//     });

//     return searchResults
// }

const searchIngredientsAPI = async (queryObject) => {


    console.log("DEBUG 2 :: ", queryObject.ingr) 
    let opts = {
        'query': queryObject.ingr, // String | The (natural language) search query.
        //'query': "Burger", // String | The (natural language) search query.
        'addChildren': true, // Boolean | Whether to add children of found foods.
        //'minProteinPercent': 10, // Number | The minimum percentage of protein the food must have (between 0 and 100).
        // 'maxProteinPercent': 90, // Number | The maximum percentage of protein the food can have (between 0 and 100).
        // 'minFatPercent': 10, // Number | The minimum percentage of fat the food must have (between 0 and 100).
        // 'maxFatPercent': 90, // Number | The maximum percentage of fat the food can have (between 0 and 100).
        // 'minCarbsPercent': 10, // Number | The minimum percentage of carbs the food must have (between 0 and 100).
        // 'maxCarbsPercent': 90, // Number | The maximum percentage of carbs the food can have (between 0 and 100).
        // 'metaInformation': false, // Boolean | Whether to return more meta information about the ingredients.
        // //'intolerances': "egg", // String | A comma-separated list of intolerances. All recipes returned must not contain ingredients that are not suitable for people with the intolerances entered. See a full list of supported intolerances.
        // 'sort': "calories", // String | The strategy to sort recipes by. See a full list of supported sorting options.
        'sortDirection': "asc", // String | The direction in which to sort. Must be either 'asc' (ascending) or 'desc' (descending).
        // 'offset': 56, // Number | The number of results to skip (between 0 and 900).
        'number': 10, // Number | The maximum number of items to return (between 1 and 100). Defaults to 10.
        // 'language': "en" // String | The language of the input. Either 'en' or 'de'.
    };


    let promise = new Promise((resolve, reject) => {
        api.ingredientSearch(opts, function (error, data, response) {
          if (error) {
            reject(error);
          } else {
            resolve(data);
          }
        });
      });

      promise.then((data) => {
        //console.log('API called successfully. Returned data: ' + data);
        //console.log(data);
        console.log('API called successfully.')
      }).catch((error) => {
        console.error(error);
      });

    const searchResults = await promise

    return searchResults
}
const ingredientInformationAPICall = async (queryObject) => {
    let id = 1001; // Number | The item's id.
    let opts = {
    //'amount': 150, // Number | The amount of this ingredient.
    //'unit': "grams" // String | The unit for the given amount.
    };
    // apiInstance.getIngredientInformation(id, opts, (error, data, response) => {
    //     if (error) {
    //         console.error(error);
    //     } else {
    //         console.log('API called successfully. Returned data: ' + data);
    //     }  
    // });

    let promise = new Promise((resolve, reject) => {
        api.getIngredientInformation(id, opts, function (error, data, response) {
          if (error) {
            reject(error);
          } else {
            resolve(data);
          }
        });
      });

      promise.then((data) => {
        //console.log('API called successfully. Returned data: ' + data);
        console.log(data);
        console.log('API called successfully.')
      }).catch((error) => {
        console.error(error);
        console.log("In error")
      });

    const searchResults = await promise

    return searchResults
}
const recipeAPICall = async (queryObject) => {

    queryObject.app_id = process.env.RECIPE_APP_ID
    queryObject.app_key = process.env.RECIPE_APP_KEY

    console.log(queryObject);

    const options = {
        method: 'GET',
        url: 'https://api.edamam.com/api/recipes/v2',
        params: queryObject,
    };

    const searchResults = axios.request(options).then(function (response) {
        return response.data
    }).catch(function (error) {
        console.error(error);
    });

    return searchResults
}

module.exports = {
    //ingredientAPICall,
    recipeAPICall,
    searchIngredientsAPI,
    ingredientInformationAPICall
};