
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
    searchRecipesByIngredientsAPI,
    searchRecipeInformationAPI 
} = require('./recipeAPI.js')

module.exports = {
    searchRecipesAPI,
    searchRecipesByIngredientsAPI ,
    searchIngredientsAPI,
    ingredientInformationAPICall,
    searchGroceryProductsAPICall,
    groceryProductInformationAPICall,
    searchByUpcAPICall,
    searchRecipeInformationAPI
}