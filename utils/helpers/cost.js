const axios = require('axios');
//const { ingredientInformationAPICall } = require('../spoonacular/externalAPICalls')
const { ingredientInformationAPICall } = require('../spoonacular/externalAPICalls')

const calculateIngredientCost = async (ingredient) => {

    // First calculate amount in grams
    let requestHeaders = {
        'x-api-key': process.env.SPOONACULAR_API_KEY
    }

    // Set up params for convert api call
    let opts = {
        ingredientName: ingredient.originalName,
        sourceAmount: ingredient.amount,
        sourceUnit: ingredient.unit,
        targetUnit: 'grams'
    }

    // Set up options for the axios call
    const options = {
        method: 'GET',
        headers: requestHeaders,
        //url: 'https://api.spoonacular.com/recipes/convert?ingredientName=flour&sourceAmount=2.5&sourceUnit=cups&targetUnit=grams',
        url: 'https://api.spoonacular.com/recipes/convert',
        params: opts,
    };

    // Convert ingredient amount to grams with this api call
    const amountConversion = await axios.request(options).then(function (response) {
        return response.data
    }).catch(function (error) {
        console.error(error.message);
    });

    // Now we have the amount of the ingredient in grams
    const amountInGrams = amountConversion.targetAmount

    // Debuging stuff
    console.log("Ingredient name :: ", ingredient.originalName) 
    console.log("Ingredient original units ::", ingredient.unit)
    console.log("Amount In Grams ::", amountInGrams)

    // Call ingredient information API to get weight per serving in grams and estimated cost
    queryObject = {}
    queryObject.id = ingredient.id
    const ingredientInformation = await ingredientInformationAPICall(queryObject)


    // set them to their own variables
    const weightPerServing = ingredientInformation.nutrition.weightPerServing.amount
    const estimatedCost = ingredientInformation.estimatedCost.value


    // Calculate cost per gram and the total cost (in cents)
    let costPerGram;
    let totalCost;

    // Some of the ingredient don't come with weight information so I had to set those to 0
    if (!weightPerServing){
        costPerGram = 0
        totalCost = 0
    }
    // For those that do have that information calculate cost per gram and total cost
    else {

        costPerGram = estimatedCost / weightPerServing 
        totalCost = costPerGram * amountInGrams
    }

    // Create a cost object
    const cost = {
        costPerGram: costPerGram,
        totalCost: totalCost
    }

    console.log("Total cost in cents ::", cost.totalCost)
    // And return it
    return cost
}

module.exports = {
    //convertIngredientAmountToGrams,
    calculateIngredientCost
}