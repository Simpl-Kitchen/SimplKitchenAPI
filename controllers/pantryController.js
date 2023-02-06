const Ingredient = require('../models/Ingredient')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')

const getAllIngredients = async (req, res) => {
    queryObject = {
        createdBy: req.user.userId
    }
    let result = Ingredient.find(queryObject)
    const ingredients = await result

    res.status(StatusCodes.OK).json({ingredients})
    console.log(queryObject)
    //res.send("Get all ingredients")
}
const getIngredient = async (req, res) => {
    res.send("Get ingredient")
}
const addIngredient = async (req, res) => {
    console.log(req.body)
    console.log(req.user)
    req.body.createdBy = req.user.userId
    const ingredient = await Ingredient.create(req.body)
    res.status(StatusCodes.CREATED).json({ingredient})
    //res.send("Add Ingredient")
}
const updateIngredient = async (req, res) => {
    res.send("Update Ingredient")
}
const deleteIngredient = async (req, res) => {
    res.send("Delete Ingredient")
}

module.exports = {
    getAllIngredients,
    getIngredient,
    addIngredient,
    updateIngredient,
    deleteIngredient
}
