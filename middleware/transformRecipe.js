const transform = async (req, res, next) => {
    const recipe = req.body
    //console.log(JSON.stringify(recipe))
    const usedIngredients = recipe.usedIngredients
    const missedIngredients = recipe.missedIngredients
    const unusedIngredients = recipe.unusedIngredients
    
    const usedIngredientIds = usedIngredients.map(ingredient => ingredient.id);
    const missedIngredientIds = missedIngredients.map(ingredient => ingredient.id);
    const unusedIngredientIds = unusedIngredients.map(ingredient => ingredient.id);
    
    req.recipe = {
        recipeID: recipe.id,
        recipeTitle: recipe.title,
        image: recipe.image,
        imageType: recipe.imageType,
        usedIngredients: usedIngredientIds,
        missedIngredients: missedIngredientIds,
        unusedIngredients: unusedIngredientIds,

        
    }
    
    console.log("Hello")
    //console.log(req.recipe)
    //console.log(ingredientIds)
    next()
}

module.exports = {transform}