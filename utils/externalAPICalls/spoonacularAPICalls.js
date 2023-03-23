require('dotenv').config()
const axios = require("axios");

// Spoonacular connection, https://spoonacular.com/food-api/docs#Ingredient-Search
const connectSpoonacularApi = require('../../connections/connectSpoonacular');
const api = connectSpoonacularApi(process.env.SPOONACULAR_API_KEY)
const { createSearchOptions } = require('../spoonacular/createSearchOptions')
// Spoonacular error handling
const SpoonacularError = require('../../errors/spoonacular');

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

const searchGroceryProductsAPICall = async (queryObject) => {

  const opts = createSearchOptions(queryObject, 'groceryProducts')

  let requestHeaders = {
    'x-api-key': process.env.SPOONACULAR_API_KEY
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
  console.log("Hello ")
  return searchResults
}

const groceryProductInformationAPICall = async (queryObject) => {
  // Documentation: https://spoonacular.com/food-api/docs#Get-Recipe-Information

  let id = queryObject.id // Number | The item's id.

  let requestHeaders = {
    'x-api-key': process.env.SPOONACULAR_API_KEY
  }

  const options = {
    method: 'GET',
    headers: requestHeaders,
    url: `https://api.spoonacular.com/food/products/${id}`,
  };

  const searchResults = axios.request(options).then(function (response) {
    return response.data
  }).catch(function (error) {
    console.error(error);
  });
  //console.log("Hello ")
  return searchResults

}
const searchByUpcAPICall = async (queryObject) => {
  let upc = queryObject.upc

  let requestHeaders = {
    'x-api-key': process.env.SPOONACULAR_API_KEY
  }

  const options = {
    method: 'GET',
    headers: requestHeaders,
    url: `https://api.spoonacular.com/food/products/upc/${upc}`,
  };

  const searchResults = axios.request(options).then(function (response) {
    return response.data
  }).catch(function (error) {
    console.error(error);
  });
  //console.log("Hello ")
  return searchResults
}

// const searchRecipesAPI = async (queryObject) => {

//   console.log(queryObject);
// }


const searchRecipesAPI = async (queryObject) => {

  console.log(queryObject);

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

module.exports = {
  //ingredientAPICall,
  searchRecipesAPI,
  searchIngredientsAPI,
  ingredientInformationAPICall,
  searchGroceryProductsAPICall,
  groceryProductInformationAPICall,
  searchByUpcAPICall
};