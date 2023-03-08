const Ingredient = require('../models/Ingredient')
const Recipe = require('../models/Recipe')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')
const generateRecipes = require('../utils/generateRecipes');

//CRUD functionality for ingredients API and DB 

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
    if (!ingredient) {
        throw new NotFoundError(`No ingredient with ${ingredientId}`)

    }
    res.status(StatusCodes.OK).json({ ingredient })
}
const addIngredient = async (req, res) => {
    //console.log(req.body)
    //console.log(req.user)
    req.body.createdBy = req.user.userId

    // Add logic to check for an already existing ingredient

    const ingredient = await Ingredient.create(req.body)
    res.status(StatusCodes.CREATED).json({ ingredient })


    // Regenerate recipes
    //generateRecipes(req.user)
}
const updateIngredient = async (req, res) => {
    const {
        body: { amount },
        user: { userId },
        params: { id: ingredientId }
    } = req

    if (amount === '') {
        throw new BadRequestError('Amount field cannot be empty')
    }
    const ingredient = await Ingredient.findByIdAndUpdate(
        { _id: ingredientId, createdBy: userId },
        req.body,
        { new: true, runValidators: true }
    )
    if (!ingredient) {
        throw new NotFoundError(`No ingredient with id ${ingredientId}`)
    }
    res.status(StatusCodes.OK).json({ ingredient })
    //res.send("Update Ingredient")
}
const deleteIngredient = async (req, res) => {
    const {
        user: { userId },
        params: { id: ingredientId }
    } = req

    const ingredient = await Ingredient.findByIdAndRemove({
        _id: ingredientId,
        createdBy: userId,
    })
    if (!ingredient) {
        throw new NotFoundError(`No ingredient with id ${ingredientId}`)
    }
    res.status(StatusCodes.OK).send()
    //res.send("Delete Ingredient")
}
//CRUD functionality for Recipe API and DB

const getAllRecipes = async (req, res) => {
    queryObject = {
        createdBy: req.user.userId
    }
    let result = Recipe.find(queryObject)
    const recipes = await result

    res.status(StatusCodes.OK).json({ recipes })
    //console.log(queryObject)
    //res.send("Get all recipes")
}

const getRecipe = async (req, res) => {
    const {
        user: { userId },
        params: { id: recipeID }
    } = req

    const recipe = await Recipe.findOne({
        _id: recipeID,
        createdBy: userId,
    })
    if (!recipe) {
        throw new NotFoundError(`No ingredient with ${recipeID}`)

    }
    res.status(StatusCodes.OK).json({ recipe })
    //res.send("Get Recipe")
}

const addRecipe = async (req, res) => {
    console.log(req.body)
    console.log(req.user)
    req.body.createdBy = req.user.userId
    const recipe = await Recipe.create(req.body)
    res.status(StatusCodes.CREATED).json({ recipe })


    // Regenerate recipes
    generateRecipes(req.user)
}

const updateRecipe = async (req, res) => {
    //needs done 
}

const deleteRecipe = async (req, res) => {
    const {
        user: { userId },
        params: { id: recipeID }
    } = req

    const ingredient = await Ingredient.findByIdAndRemove({
        _id: recipeID,
        createdBy: userId,
    })
    if (!Recipe) {
        throw new NotFoundError(`No recipe with id ${recipeID}`)
    }
    res.status(StatusCodes.OK).send()
    //res.send("Delete Ingredient")
}

module.exports = {
    //ingredients exports
    getAllIngredients,
    getIngredient,
    addIngredient,
    updateIngredient,
    deleteIngredient,
    //recipe exports
    getAllRecipes,
    getRecipe,
    addRecipe,
    updateRecipe,
    deleteRecipe,
}
