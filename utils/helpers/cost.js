const axios = require('axios');
//const { ingredientInformationAPICall } = require('../spoonacular/externalAPICalls')
const { ingredientInformationAPICall } = require('../spoonacular/externalAPICalls')

// const convertIngredientAmountToGrams = async (name, amount, unit) => {

//     //console.log(process.env.SPOONACULAR_API_KEY)

//     let requestHeaders = {
//         'x-api-key': process.env.SPOONACULAR_API_KEY
//     }

//     let opts = {
//         ingredientName: name,
//         sourceAmount: amount,
//         sourceUnit: unit,
//         targetUnit: 'grams'
//     }

//     const options = {
//         method: 'GET',
//         headers: requestHeaders,
//         //url: 'https://api.spoonacular.com/recipes/convert?ingredientName=flour&sourceAmount=2.5&sourceUnit=cups&targetUnit=grams',
//         url: 'https://api.spoonacular.com/recipes/convert',
//         params: opts,
//     };

//     const searchResults = axios.request(options).then(function (response) {
//         return response.data
//     }).catch(function (error) {
//         console.error(error);
//     });

//     //console.log(searchResults)

//     return searchResults
// }

const calculateIngredientCost = async (ingredient) => {

    // console.log("Ingredient ID ::", ingredient.ingredientID)
    // console.log("Ingredient name::", ingredient.ingredientName)
    // console.log("Amount in Recipe::", ingredient.amount, ingredient.unit)
    // console.log("--------------------")
    // First calculate amount in grams
    let requestHeaders = {
        'x-api-key': process.env.SPOONACULAR_API_KEY
    }

    let opts = {
        ingredientName: ingredient.ingredientName,
        sourceAmount: ingredient.amount,
        sourceUnit: ingredient.unit,
        targetUnit: 'grams'
    }

    const options = {
        method: 'GET',
        headers: requestHeaders,
        //url: 'https://api.spoonacular.com/recipes/convert?ingredientName=flour&sourceAmount=2.5&sourceUnit=cups&targetUnit=grams',
        url: 'https://api.spoonacular.com/recipes/convert',
        params: opts,
    };

    const amountConversion = await axios.request(options).then(function (response) {
        return response.data
    }).catch(function (error) {
        console.error(error);
    });

    //console.log(amountConversion)
    const amountInGrams = amountConversion.targetAmount
    console.log("Amount In Grams ::", amountInGrams)

    // Call ingredient information API to get weight per serving in grams and estimated cost
    queryObject = {}
    queryObject.id = ingredient.ingredientID
    const ingredientInformation = await ingredientInformationAPICall(queryObject)


    // set them to their own variables
    const weightPerServing = ingredientInformation.nutrition.weightPerServing.amount
    const estimatedCost = ingredientInformation.estimatedCost.value

    // Calculate cost per gram and the total cost (in cents)
    const costPerGram = estimatedCost / (weightPerServing == 0 ? 1 : weightPerServing)
    const totalCost = costPerGram * amountInGrams

    const cost = {
        costPerGram: costPerGram,
        totalCost: totalCost
    }

    return cost





    //return searchResults

}

module.exports = {
    //convertIngredientAmountToGrams,
    calculateIngredientCost
}