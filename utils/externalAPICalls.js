// Will move the API call here
require('dotenv').config()
const axios = require("axios");


const ingredientAPICall = async (queryObject) => {
    
    const options = {
                method: 'GET',
                url:  'https://api.edamam.com/api/food-database/v2/parser',
                params: queryObject,
            };
    

    const searchResults = axios.request(options).then(function (response) {
         const data = []
         foodData = response.data.hints
         for (let i = 0; i < foodData.length; i++) {
             const { food } = response.data.hints[i]
             data.push(food)
         }
         return data
     }).catch(function (error) {
         console.error(error);
     });

    return searchResults
}

const recipeAPICall = async(queryObject) => {

}

module.exports = ingredientAPICall;