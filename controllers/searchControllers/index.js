// Import of ingredient searches 
const {
    searchIngredients,
    searchIngredientInformation,
} = require('./ingredientSearchController')
// Import of grocery item searches 
const {
    searchGroceryProducts,
    searchGroceryProductInformation,
    searchGroceryProductByUPC,
} = require('./groceryItemSearchController')
// Import recipe searches and recipe generation
const {
    searchRecipes,
    generateRecipes
} = require('./recipeSearchController')

// Exports 
module.exports = {
    searchIngredients,
    searchIngredientInformation,
    searchGroceryProducts,
    searchGroceryProductInformation,
    searchGroceryProductByUPC,
    searchRecipes,
    generateRecipes,
}

