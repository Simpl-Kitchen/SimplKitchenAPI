//Imports 
const RecipeQueue = require('../../models/RecipeQueue')
const userHelpers = require('../helpers')
const externalAPICalls = require('../spoonacular/externalAPICalls')
const {calculateIngredientCost, calculateRecipeCost} = require('../helpers/cost')


const fillQueue = async (queryObject) => {
    

    // If there is no queryObject.number use the count of records belonging to the user
    if (!queryObject.number){

        const count = await RecipeQueue.countDocuments({createdBy: queryObject.userId})
        console.log("Inside if statement, count == ", count)
        // Max is 5
        queryObject.number = 5 - count
    }
    
    // Get new recipes
    const recipeData = await externalAPICalls.searchRecipesByIngredientsAPI(queryObject)
    
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    for (const recipe of recipeData) {  

        // Check if the recipe already exists in the RecipeQueue
        const existingRecipe = await RecipeQueue.findOne({ id: recipe.id });

        // If it doesn't exist, create a new document
        if (!existingRecipe) {

            //let totalCost = 0;
            let queueRecipe = {};
            
            queueRecipe.id = recipe.id;
            queueRecipe.title = recipe.title;
            queueRecipe.image = recipe.image;
            queueRecipe.usedIngredientCount = recipe.usedIngredientCount;
            queueRecipe.missedIngredientCount = recipe.missedIngredientCount;
            
            queueRecipe.missedIngredients = [];
            for (const ingredient of recipe.missedIngredients) {
                queueRecipe.missedIngredients.push({
                    id: ingredient.id,
                    amount: ingredient.amount,
                    unit: ingredient.unit,
                    originalName: ingredient.originalName,
                    image: ingredient.image,
                });
            }

            queueRecipe.usedIngredients = [];
            for (const ingredient of recipe.usedIngredients) {
                queueRecipe.usedIngredients.push({
                    id: ingredient.id,
                    amount: ingredient.amount,
                    unit: ingredient.unit,
                    originalName: ingredient.originalName,
                    image: ingredient.image,
                });
            
            }


            const costPerServing = await calculateRecipeCost(recipe);




            queueRecipe.cost = costPerServing;
            queueRecipe.createdBy = queryObject.userId;
            await RecipeQueue.create(queueRecipe);
        }
        else {
            console.log("Recipe already exists in the queue")
        }
    
        
        // If the recipe does not exist, create a new document
    };
}

module.exports = {
    fillQueue,
}