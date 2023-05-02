const axios = require('axios');
//const { ingredientInformationAPICall } = require('../spoonacular/externalAPICalls')
const { ingredientInformationAPICall } = require('../spoonacular/externalAPICalls')

const calculateIngredientCost = async (ingredient) => {

    queryObject = {}
    queryObject.id = ingredient.id
    queryObject.amount = ingredient.amount
    queryObject.unit = ingredient.unit


    const results = await ingredientInformationAPICall(queryObject)

    const cost = results.estimatedCost
    return cost
}

module.exports = {
    //convertIngredientAmountToGrams,
    calculateIngredientCost
}