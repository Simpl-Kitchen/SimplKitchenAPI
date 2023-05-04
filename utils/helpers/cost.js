// Import spoonacular dependencies
const { ingredientInformationAPICall, searchRecipeInformationAPI} = require('../spoonacular/externalAPICalls')

const calculateIngredientCost = async (ingredient) => {

    // Construct query object for ingredientInformationAPICall
    queryObject = {}
    queryObject.id = ingredient.ingredientID
    queryObject.amount = ingredient.amount
    queryObject.unit = !ingredient.unit ? "" : ingredient.unit

    // Call ingredientInformationAPICall
    const results = await ingredientInformationAPICall(queryObject)


    // Extract cost from results
    const cost = results.estimatedCost
    return cost
}
const calculateRecipeCost = async (recipe) => {
    let queryObject = {}
    let costPerServing = {}
    queryObject.id = recipe.id

    const results = await searchRecipeInformationAPI(queryObject)

    costPerServing.value = results.pricePerServing
    costPerServing.unit = "US Cents"
    costPerServing.servings = results.servings
    return costPerServing
    



}
// Exports 
module.exports = {
    calculateIngredientCost,
    calculateRecipeCost
}