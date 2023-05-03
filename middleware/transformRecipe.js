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
    console.log("cost == ", cost)
    //console.log("Total Cost == ", totalCost)
    console.log("Missed Ingredient")
    await delay(400);  
}
  // let unusedIngredients = recipe.unusedIngredients.map(item => {
    //   return {
      //     ingredientID: item.id,
  //     ingredientName: item.name,
  //     amount: item.amount,
  //     unit: item.unit === '' || item.unit === null || item.unit === undefined ? "whole" : item.unit,
  //     image: item.image
  //   };
  // });

  // Look up recipe for servings 



  // Set a delay so I dont go over api limit
  // const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  // let recipeTotalCost = 0
  // // For each missedIngredient, calculate the cost
  // for (const ingredient of missedIngredients) {
  //   // For each ingredient in the recipe, get its cost
  //   const cost = await calculateIngredientCost(ingredient);

  //   console.log("Cost :: ", cost);

  //   // Assign the cost to the current ingredient
  //   ingredient.cost = cost;

  //   // Add the ingredient's total cost to the recipeTotalCost
  //   recipeTotalCost += cost.totalCost;

  //   // Delay 1 second (1000 ms) before processing the next ingredient
  //   await delay(400);
  // }

  //recipe.cost = recipeTotalCost

  // console.log(usedIngredients)
  // console.log(missedIngredients)
  // console.log(unusedIngredients)

  //console.log(missedIngredients)


  req.recipe = {
    recipeID: recipe.id,
    recipeTitle: recipe.title,
    image: recipe.image,
    //imageType: recipe.imageType,
    usedIngredients: usedIngredients,
    missedIngredients: missedIngredients,
    //unusedIngredients: recipe.unusedIngredients,
    totalCost: recipe.cost


  }

  console.log(req.recipe)

  console.log("Hello")
  //console.log(req.recipe)
  //console.log(ingredientIds)
  next()
}

module.exports = { transform }