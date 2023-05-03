const { calculateIngredientCost } = require('../utils/helpers/cost')
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const transform = async (req, res, next) => {
  let recipe = req.body

  let usedIngredients = recipe.usedIngredients.map(item => {
    return {
      ingredientID: item.id,
      ingredientName: item.originalName,
      amount: item.amount,
      //unit: item.unit === '' || item.unit === null || item.unit === undefined ? '' : item.unit,
      unit: !item.unit ? "" : item.unit,
      image: item.image
    };
  });
  let missedIngredients = recipe.missedIngredients.map(item => {
    return {
      ingredientID: item.id,
      ingredientName: item.originalName,
      amount: item.amount,
      //unit: item.unit === '' || item.unit === null || item.unit === undefined ? "whole" : item.unit,
      unit: !item.unit ? "" : item.unit,
      image: item.image
    };
  });
  for (let ingredient of missedIngredients) {
    const cost = await calculateIngredientCost(ingredient);
    ingredient.cost = cost
    //totalCost = totalCost + cost.value;
    // console.log("cost == ", cost)
    //console.log("Total Cost == ", totalCost)
    //console.log("Missed Ingredient")
    await delay(400);  
}

  req.recipe = {
    recipeID: recipe.id,
    recipeTitle: recipe.title,
    image: recipe.image,
    usedIngredients: usedIngredients,
    missedIngredients: missedIngredients,
    totalCost: recipe.cost


  }

  next()
}

module.exports = { transform }