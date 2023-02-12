// Regenerate new recipes every time a User adds a new ingredient.
const axios = require("axios");
const Ingredient = require("../models/Ingredient")

const generateRecipes = async (user) => {
    console.log("generateRecipe");

    // look up all ingredients by user ID
    // Call Recipe API using ingredient names
}

module.exports = generateRecipes