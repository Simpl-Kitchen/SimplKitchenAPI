// Will move the API call here
require('dotenv').config()
const axios = require("axios");


// This version returns just the hints **
// const ingredientAPICall = async (queryObject) => {
    
//     const options = {
//                 method: 'GET',
//                 url:  'https://api.edamam.com/api/food-database/v2/parser',
//                 params: queryObject,
//             };
    

//     const searchResults = axios.request(options).then(function (response) {
//          const data = []
//          console.log(response.data);
//          foodData = response.data.hints
//          for (let i = 0; i < foodData.length; i++) {
//              const { food } = response.data.hints[i]
//              data.push(food)
//          }
//          return data
//      }).catch(function (error) {
//          console.error(error);
//      });

//     return searchResults
// }

// This returns all the data ** 
const ingredientAPICall = async (queryObject) => {
    
    const options = {
                method: 'GET',
                url:  'https://api.edamam.com/api/food-database/v2/parser',
                params: queryObject,
            };
    
    const searchResults = axios.request(options).then(function (response) {
         return response.data
     }).catch(function (error) {
         console.error(error);
     });

    return searchResults
}

const recipeAPICall = async(queryObject) => {

}

module.exports = {
    ingredientAPICall,
    recipeAPICall,
};