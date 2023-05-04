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
const populateRecipe = async (recipe) => {
    let queryObject = {}
    let costPerServing = {}
    let addedInformation = {}
    queryObject.id = recipe.id

    const results = await searchRecipeInformationAPI(queryObject)


    // recipe.costPerServing.value = results.pricePerServing
    // recipe.costPerServing.unit = "US Cents"
    // recipe.costPerServing.servings = results.servings
    costPerServing.value = results.pricePerServing
    costPerServing.unit = "US Cents"
    costPerServing.servings = results.servings

    recipe.cost = costPerServing

    if (results.instructions){
        //addedInformation.instructions = results.instructions
        recipe.instructions = results.instructions
    }
    else if (results.summary) {
        //addedInformation.instructions = results.summary
        recipe.instructions = results.summary
    }
    else {
        //addedInformation.instructions = "No instructions available"
        recipe.instruction = "No instructions available"
    }
    //addedInformation.instructions = results.instructions
    //return costPerServing
    //return addedInformation
    return recipe

}

module.exports = {
    calculateIngredientCost,
    populateRecipe,
}