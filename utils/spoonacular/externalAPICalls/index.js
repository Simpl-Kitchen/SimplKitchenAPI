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
    searchRecipesByIngredientsAPI 
} = require('./recipeAPI.js')

module.exports = {
    searchRecipesAPI,
    searchRecipesByIngredientsAPI ,
    searchIngredientsAPI,
    ingredientInformationAPICall,
    searchGroceryProductsAPICall,
    groceryProductInformationAPICall,
    searchByUpcAPICall
}