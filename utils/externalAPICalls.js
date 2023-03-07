require('dotenv').config()
const axios = require("axios");


// Spoonacular connection, https://spoonacular.com/food-api/docs#Ingredient-Search
const connectSpoonacularApi = require('../connections/connectSpoonacular');
const api = connectSpoonacularApi(process.env.SPOONACULAR_API_KEY)

// Spoonacular error handling
const SpoonacularError = require('../errors/spoonacular');

// This returns all the data **  (Edamam, old)

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

// Call to Spoonacular Ingredient Search endpoint
const searchIngredientsAPI = async (queryObject) => {

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
    //'intolerances': "egg", // String | A comma-separated list of intolerances. All recipes returned must not contain ingredients that are not suitable for people with the intolerances entered. See a full list of supported intolerances.
    // 'sort': "calories", // String | The strategy to sort recipes by. See a full list of supported sorting options.
    'sortDirection': "asc", // String | The direction in which to sort. Must be either 'asc' (ascending) or 'desc' (descending).
    // 'offset': 56, // Number | The number of results to skip (between 0 and 900).
    'number': 10, // Number | The maximum number of items to return (between 1 and 100). Defaults to 10.
    // 'language': "en" // String | The language of the input. Either 'en' or 'de'.
  };

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

const searchGroceryProductsAPICall = async (queryObject) => {

  let opts = {
    'query': queryObject.ingr, // String | The (natural language) search query.
    //'query': burger, // String | The (natural language) search query.
    //'minCalories': 50, // Number | The minimum amount of calories the product must have.
    //'maxCalories': 800, // Number | The maximum amount of calories the product can have.
    //'minCarbs': 10, // Number | The minimum amount of carbohydrates in grams the product must have.
    //'maxCarbs': 100, // Number | The maximum amount of carbohydrates in grams the product can have.
    //'minProtein': 10, // Number | The minimum amount of protein in grams the product must have.
    //'maxProtein': 100, // Number | The maximum amount of protein in grams the product can have.
    //'minFat': 1, // Number | The minimum amount of fat in grams the product must have.
    //'maxFat': 100, // Number | The maximum amount of fat in grams the product can have.
    //'addProductInformation': true, // Boolean | If set to true, you get more information about the products returned.
    //'offset': 56, // Number | The number of results to skip (between 0 and 900).
    'number': !queryObject.pages ? 10 : queryObject.pages // Number | The maximum number of items to return (between 1 and 100). Defaults to 10.
  };

  let requestHeaders = {
    'x-api-key': 'e44c9f0796b4400ab3a69f1354d139a9'
  }

  const options = {
    method: 'GET',
    headers: requestHeaders,
    url: 'https://api.spoonacular.com/food/products/search',
    params: opts,
  };

  const searchResults = axios.request(options).then(function (response) {
    return response.data
  }).catch(function (error) {
    console.error(error);
  });

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
  ingredientInformationAPICall,
  searchGroceryProductsAPICall
};