const RecipeQueue = require('../../models/RecipeQueue')
const userHelpers = require('../helpers')
const externalAPICalls = require('../spoonacular/externalAPICalls')
const {calculateIngredientCost} = require('../helpers/cost')


const fillQueue = async (queryObject) => {
    
    //console.log("Hello from fill Queue")

    // If there is no queryObject.number use the count of records belonging to the user
    if (!queryObject.number){

        //console.log(queryObject)
        const count = await RecipeQueue.countDocuments({createdBy: queryObject.userId})
        console.log("Inside if statement, count == ", count)
        //queryObject.number = 20 - count
        queryObject.number = 5 - count
    }
    
    // for test
    // queryObject.number = 1

    console.log("queryObject.number == ", queryObject.number)
    
    // Get new recipes
    const recipeData = await externalAPICalls.searchRecipesByIngredientsAPI(queryObject)
    //console.log(recipeData[0].missedIngredients)
    
    //const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    // 
    await Promise.all(recipeData.map(async (recipe) => {
        // recipe.createdBy = queryObject.userId
        // await RecipeQueue.create(recipe);
        
        //recipe.createdBy = queryObject.userId;

        // Check if the recipe already exists in the RecipeQueue
        const existingRecipe = await RecipeQueue.findOne({ id: recipe.id });

        // If it doesn't exist, create a new document
        if (!existingRecipe) {

            
            queueRecipe = {};
            
            queueRecipe.id = recipe.id;
            queueRecipe.title = recipe.title;
            queueRecipe.image = recipe.image;
            queueRecipe.usedIngredientCount = recipe.usedIngredientCount;
            queueRecipe.missedIngredientCount = recipe.missedIngredientCount;
            
            queueRecipe.missedIngredients = [];
            for (const ingredient of recipe.missedIngredients) {
                // const cost = await calculateIngredientCost(ingredient);
                // await delay(100);
                queueRecipe.missedIngredients.push({
                    id: ingredient.id,
                    amount: ingredient.amount,
                    unit: ingredient.unit,
                    //originalName: ingredient.name,
                    originalName: ingredient.originalName,
                    image: ingredient.image,
                    //cost: cost
                });
                //await delay(1000);
            }
            // queueRecipe.missedIngredients = await Promise.all(recipe.missedIngredients.map(async ingredient => {
            //     const cost = await calculateIngredientCost(ingredient);
            //     await delay(800);
            //     return {
            //         id: ingredient.id,
            //         amount: ingredient.amount,
            //         unit: ingredient.unit,
            //         originalName: ingredient.originalName,
            //         image: ingredient.image,
            //         cost: cost
            //     };
            // }));

            queueRecipe.usedIngredients = [];
            for (const ingredient of recipe.usedIngredients) {
                // const cost = await calculateIngredientCost(ingredient);
                // await delay(1000);
                queueRecipe.usedIngredients.push({
                    id: ingredient.id,
                    amount: ingredient.amount,
                    unit: ingredient.unit,
                    originalName: ingredient.originalName,
                    image: ingredient.image,
                    //cost: cost
                });
            
            }
            // queueRecipe.usedIngredients = await Promise.all(recipe.usedIngredients.map(async ingredient => {
            //     const cost = await calculateIngredientCost(ingredient);
            //     await delay(800);
            //     return {
            //         id: ingredient.id,
            //         amount: ingredient.amount,
            //         unit: ingredient.unit,
            //         originalName: ingredient.originalName,
            //         image: ingredient.image,
            //         cost: cost
            //     };
            // }));


            queueRecipe.createdBy = queryObject.userId;


            // console.log(queueRecipe)
            // console.log
            await RecipeQueue.create(queueRecipe);
        }
    
        
        // If the recipe does not exist, create a new document
    }));
}

module.exports = {
    fillQueue,
}