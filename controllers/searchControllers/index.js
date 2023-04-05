const {
    searchIngredients,
    searchIngredientInformation,
} = require('./ingredientSearchController')

const {
    searchGroceryProducts,
    searchGroceryProductInformation,
    searchGroceryProductByUPC,
} = require('./groceryItemSearchController')

const {
    searchRecipes,
} = require('./recipeSearchController')

module.exports = {
    searchIngredients,
    searchIngredientInformation,
    searchGroceryProducts,
    searchGroceryProductInformation,
    searchGroceryProductByUPC,
    searchRecipes,
}

