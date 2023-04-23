//const User = require('../models/User')

const User = require('../../models/User')
const Ingredient = require('../../models/Ingredient')

const getUserIntolerances = async (userId) => {
    const user = await User.findById(userId);
    return user.intolerances.toString();
};
const getUserDiets = async (userId) => {
    const user = await User.findById(userId);
    return user.diets.toString();
}
const getUserIngredients = async (userId) => {
    queryObject = {
        createdBy: userId
    }
    let result = Ingredient.find(queryObject)
    const ingredients = await result
    const ingredientNames = ingredients.map((ingredient) => ingredient.ingredientName);


    return ingredientNames.toString();
    //console.log(ingredients.name)
}

module.exports = {
    getUserIntolerances,
    getUserIngredients,
    getUserDiets,
};