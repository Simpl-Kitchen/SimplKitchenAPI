const { ingredientInformationAPICall } = require('../spoonacular/externalAPICalls')

const calculateIngredientCost = async (ingredient) => {

    // Construct query object for ingredientInformationAPICall
    queryObject = {}
    queryObject.id = ingredient.id
    queryObject.amount = ingredient.amount
    queryObject.unit = !ingredient.unit ? "" : ingredient.unit

    // Call ingredientInformationAPICall
    const results = await ingredientInformationAPICall(queryObject)

    console.log("Ingredient == ", ingredient.originalName)
    console.log("Estimated Cost == ", results.estimatedCost.value)

    // Extract cost from results
    const cost = results.estimatedCost
    return cost
}

module.exports = {
    calculateIngredientCost
}