//Import depedencies
const Ingredient = require('../models/Ingredient')
const Recipe = require('../models/Recipe')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')
const { GetRecipeEquipmentByID200Response } = require('spoonacular_api_simplkitchen')

//CRUD functionality for ingredients API and DB 
//Abstracted by the Ingredient model
const getAllIngredients = async (req, res) => {
    queryObject = {
        createdBy: req.user.userId
    }
    let result = Ingredient.find(queryObject)
    const ingredients = await result

    res.status(StatusCodes.OK).json({ ingredients })
}
const getIngredient = async (req, res) => {
    const {
        user: { userId },
        params: { id: ingredientId }
    } = req

    const ingredient = await Ingredient.findOne({
        _id: ingredientId,
        createdBy: userId,
    })
    //if ingredient is not in the user's pantry, add it
    if (!ingredient) {
        throw new NotFoundError(`No ingredient with ${ingredientId}`)

    }
    res.status(StatusCodes.OK).json({ ingredient })
}
const addIngredient = async (req, res) => {
    req.body.createdBy = req.user.userId

    let ingredient = await Ingredient.findOne({
        ingredientId: req.body.ingredientId,
        createdBy: req.user.userId
    })

    // If ingredient is not in the user's pantry, add it
    if (!ingredient) {
        ingredient = await Ingredient.create(req.body)
        res.status(StatusCodes.CREATED).json({ ingredient })

    }
    // If ingredient is in the user's pantry, update amount.
    else {
        await ingredient.incrementAmount();
        res.status(StatusCodes.OK).json({ ingredient });
    }
}
const updateIngredient = async (req, res) => {
    const {
        body: { amount },
        user: { userId },
        params: { id: ingredientId }
    } = req
    //fail safe for empty fields
    if (amount === '') {
        throw new BadRequestError('Amount field cannot be empty')
    }
    console.log(req.params.id)

    const ingredient = await Ingredient.findOneAndUpdate(
        { ingredientId: req.params.id, createdBy: req.user.userId },
        req.body,
        { new: true, runValidators: true }
    )
    if (!ingredient) {
        throw new NotFoundError(`No ingredient with id ${ingredientId}`)
    }
    res.status(StatusCodes.OK).json({ ingredient })
}
const deleteIngredient = async (req, res) => {
    const {
        user: { userId },
        params: { id: ingredientId }
    } = req

    let ingredient = await Ingredient.findOne({
        ingredientId: req.params.id,
        createdBy: req.user.userId
    })
    // fail safe for none-existant ID 
    if (!ingredient) {
        throw new NotFoundError(`No ingredient with id ${ingredientId}`)
    }
    //More than 1 ingredient
    if (ingredient.amount > 1) {
        await ingredient.decrementAmount();
        res.status(StatusCodes.OK).json({ ingredient });
    }
    //Default case, remove 1 ingredient
    else {
        await ingredient.remove();
        res.status(StatusCodes.OK).send()
    }
}
//CRUD functionality for Recipe API and DB
const getAllRecipes = async (req, res) => {
    const { search, status, jobType, sort } = req.query;

    queryObject = {
        createdBy: req.user.userId
    }
    let result = Recipe.find(queryObject)

    if (sort === 'latest') {
        result = result.sort('-createdAt');
      }
      if (sort === 'oldest') {
        result = result.sort('createdAt');
      }
      if (sort === 'a-z') {
        result = result.sort('position');
      }
      if (sort === 'z-a') {
        result = result.sort('-position');
      }

      const recipes = await result;

    res.status(StatusCodes.OK).json({ recipes })
}

const getRecipe = async (req, res) => {
    const {
        user: { userId },
        params: { id: recipeID }
    } = req

    const recipe = await Recipe.findOne({
        _id: recipeID,
    })
    // fail safe for no recipe ID 
    if (!recipe) {
        throw new NotFoundError(`No recipe with ${recipeID}`)

    }
    res.status(StatusCodes.OK).json({ recipe })
}

const addRecipe = async (req, res) => {
    req.recipe.createdBy = req.user.userId

    const recipe = await Recipe.create(req.recipe);
    res.status(StatusCodes.CREATED).json({ recipe });

}

const deleteRecipe = async (req, res) => {
    const {
        user: { userId },
        params: { id: recipeID }
    } = req

    let recipe = await Recipe.findOne({
        _id: recipeID,
    })
    // fail safe for none-existant recipe ID
    if (!recipe) {
        throw new NotFoundError(`No ingredient with id ${recipeID}`)
    }
    // check for if recipe amount is greater than 1
    if (recipe.amount > 1) {
        await recipe.decrementAmount();
        res.status(StatusCodes.OK).json({ recipe });
    }
    else {
        await recipe.remove();
        res.status(StatusCodes.OK).send()
    }
}
const updateRecipe = async (req, res) => {
}
//Exports 
module.exports = {
    getAllIngredients,
    getIngredient,
    addIngredient,
    updateIngredient,
    deleteIngredient,
    getAllRecipes,
    getRecipe,
    addRecipe,
    updateRecipe,
    deleteRecipe,
}
