const { calculateIngredientCost } = require('../utils/helpers/cost')

const transform = async (req, res, next) => {
  let recipe = req.body
  //console.log(JSON.stringify(recipe))
  //const usedIngredients = recipe.usedIngredients

  let usedIngredients = recipe.usedIngredients.map(item => {
    return {
      ingredientID: item.id,
      ingredientName: item.name,
      amount: item.amount,
      unit: item.unit === '' || item.unit === null || item.unit === undefined ? "whole" : item.unit,
      image: item.image
    };
  });
  let missedIngredients = recipe.missedIngredients.map(item => {
    return {
      ingredientID: item.id,
      ingredientName: item.name,
      amount: item.amount,
      unit: item.unit === '' || item.unit === null || item.unit === undefined ? "whole" : item.unit,
      image: item.image
    };
  });
  let unusedIngredients = recipe.unusedIngredients.map(item => {
    return {
      ingredientID: item.id,
      ingredientName: item.name,
      amount: item.amount,
      unit: item.unit === '' || item.unit === null || item.unit === undefined ? "whole" : item.unit,
      image: item.image
    };
  });

  // Look up recipe for servings 



  // Set a delay so I dont go over api limit
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  let recipeTotalCost = 0
  // For each missedIngredient, calculate the cost
  for (const ingredient of missedIngredients) {
    // For each ingredient in the recipe, get its cost
    const cost = await calculateIngredientCost(ingredient);

    console.log("Cost :: ", cost);

    // Assign the cost to the current ingredient
    ingredient.cost = cost;

    // Add the ingredient's total cost to the recipeTotalCost
    recipeTotalCost += cost.totalCost;

    // Delay 1 second (1000 ms) before processing the next ingredient
    await delay(400);
  }

  recipe.cost = recipeTotalCost

  // console.log(usedIngredients)
  // console.log(missedIngredients)
  // console.log(unusedIngredients)

  console.log(missedIngredients)


  req.recipe = {
    recipeID: recipe.id,
    recipeTitle: recipe.title,
    image: recipe.image,
    imageType: recipe.imageType,
    usedIngredients: usedIngredients,
    missedIngredients: missedIngredients,
    unusedIngredients: unusedIngredients,
    totalCost: recipeTotalCost


  }

  console.log("Hello")
  //console.log(req.recipe)
  //console.log(ingredientIds)
  next()
}

module.exports = { transform }