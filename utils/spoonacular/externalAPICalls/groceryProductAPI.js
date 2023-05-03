const axios = require("axios");

// Search options utility for converting query object to Spoonacular API options
const { createSearchOptions } = require('../createSearchOptions')

// Search grocery function 
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
    return searchResults
}
// Exports 
module.exports = {
    searchGroceryProductsAPICall,
    groceryProductInformationAPICall,
    searchByUpcAPICall
}