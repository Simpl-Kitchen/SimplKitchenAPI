// const {
//     searchRecipesAPI,
//     searchIngredientsAPI,
//     ingredientInformationAPICall,
//     searchGroceryProductsAPICall,
//     groceryProductInformationAPICall,
//     searchByUpcAPICall
// } = require('./spoonacularAPICalls')

const {
    searchIngredientsAPI,
    ingredientInformationAPICall
} = require('./ingredientAPI.js')

const {
    searchGroceryProductsAPICall,
    groceryProductInformationAPICall,
    searchByUpcAPICall
} = require('./groceryProductAPI.js')

const {
    searchRecipesAPI,
    getRandomRecipeAPI
} = require('./recipeAPI.js')

module.exports = {
    searchRecipesAPI,
    getRandomRecipeAPI,
    searchIngredientsAPI,
    ingredientInformationAPICall,
    searchGroceryProductsAPICall,
    groceryProductInformationAPICall,
    searchByUpcAPICall
}