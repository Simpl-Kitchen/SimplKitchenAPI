const RecipeQueue = require('../../models/RecipeQueue')
const userHelpers = require('../helpers')
const externalAPICalls = require('../spoonacular/externalAPICalls')


const fillQueue = async (queryObject) => {
    
    console.log("Hello from fill Queue")

    // If there is no queryObject.number use the count of records belonging to the user
    if (!queryObject.number){

        //console.log(queryObject)
        const count = await RecipeQueue.countDocuments({createdBy: queryObject.userId})
        console.log("Inside if statement, count == ", count)
        queryObject.number = 20 - count
    }
    
    console.log("queryObject.number == ", queryObject.number)
    
    // Get new recipes
    const recipeData = await externalAPICalls.searchRecipesByIngredientsAPI(queryObject)
    //console.log(recipeData)

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

            queueRecipe.missedIngredients = recipe.missedIngredients.map(ingredient => ({
                id: ingredient.id,
                amount: ingredient.amount,
                unit: ingredient.unit,
                originalName: ingredient.originalName,
                image: ingredient.image
            }));

            queueRecipe.usedIngredients = recipe.usedIngredients.map(ingredient => ({
                id: ingredient.id,
                amount: ingredient.amount,
                unit: ingredient.unit,
                originalName: ingredient.originalName,
                image: ingredient.image
            }));

            queueRecipe.createdBy = queryObject.userId;



            await RecipeQueue.create(queueRecipe);
        }
    
        
        // If the recipe does not exist, create a new document
    }));
}

module.exports = {
    fillQueue,
}