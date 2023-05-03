const { ingredientInformationAPICall, searchRecipeInformationAPI} = require('../spoonacular/externalAPICalls')

const calculateIngredientCost = async (ingredient) => {

    // Construct query object for ingredientInformationAPICall
    queryObject = {}
    queryObject.id = ingredient.id
    queryObject.amount = ingredient.amount
    queryObject.unit = !ingredient.unit ? "" : ingredient.unit

    // Call ingredientInformationAPICall
    const results = await ingredientInformationAPICall(queryObject)

    // console.log("Ingredient == ", ingredient.originalName)
    // console.log("Estimated Cost == ", results.estimatedCost.value)

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

    // console.log("Cost Per Serving == ", costPerServing.cost)
    // console.log("Servings == ", costPerServing.servings)
    // console.log("Units == ", costPerServing.units)

    return costPerServing
    



}

module.exports = {
    calculateIngredientCost,
    calculateRecipeCost
}