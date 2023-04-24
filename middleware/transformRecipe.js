const transform = async (req, res, next) => {
    const recipe = req.body
    //console.log(JSON.stringify(recipe))
    //const usedIngredients = recipe.usedIngredients

    const usedIngredients = recipe.usedIngredients.map(item => {
        return {
          id: item.id,
          name: item.name,
          amount: item.amount,
          unit: item.unit === '' ? "whole" : item.unit,
          image: item.image
        };
      });
    const missedIngredients = recipe.missedIngredients.map(item => {
        return {
          id: item.id,
          name: item.name,
          amount: item.amount,
          unit: item.unit === '' ? "whole" : item.unit,
          image: item.image
        };
      });
    const unusedIngredients = recipe.unusedIngredients.map(item => {
        return {
          ingredientID: item.id,
          ingredientName: item.name,
          amount: item.amount,
          unit: item.unit === '' ? "whole" : item.unit,
          image: item.image
        };
      });

    //console.log(usedIngredients)
    //console.log(missedIngredients)
    console.log(unusedIngredients)
    
    // const usedIngredientIds = usedIngredients.map(ingredient => ingredient.id);
    // const missedIngredientIds = missedIngredients.map(ingredient => ingredient.id);
    // const unusedIngredientIds = unusedIngredients.map(ingredient => ingredient.id);
    
    

    req.recipe = {
        recipeID: recipe.id,
        recipeTitle: recipe.title,
        image: recipe.image,
        imageType: recipe.imageType,
        usedIngredients: usedIngredients,
        missedIngredients: missedIngredients,
        unusedIngredients: unusedIngredients,

        
    }
    
    console.log("Hello")
    //console.log(req.recipe)
    //console.log(ingredientIds)
    next()
}

module.exports = {transform}