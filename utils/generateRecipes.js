// Regenerate new recipes every time a User adds a new ingredient.
const axios = require("axios");
const Ingredient = require("../models/Ingredient");
const { recipeAPICall } = require("./externalAPICalls");

const generateRecipes = async (user) => {
    //console.log("generateRecipe");
    let ingredientNames = []

    const {userId} = user;
    //console.log(userId)

    queryObject = {
        createdBy: userId
    }

    let result = Ingredient.find(queryObject)

    const ingredients = await result

    ingredientNames.push("Chicken")
    ingredientNames.push("Butter")
    ingredientNames.push("Lettuce")
    // for(let i = 0; i < ingredients.length; i++) {
        
    //     ingredientNames.push(ingredients[i].label)
    //     //console.log(ingredients[i].label);

    // }
    //console.log(ingredientNames)
    //console.log(ingredientNames.toString())

    const recipeQueryObject = {}
    recipeQueryObject.q = ingredientNames.toString()
    recipeQueryObject.type = "any"

    //console.log(recipeQueryObject);
    recipeData = await recipeAPICall(recipeQueryObject);

    console.log(recipeData)

    



    // look up all ingredients by user ID
    // Call Recipe API using ingredient names
    // Store Recipes
}

module.exports = generateRecipes