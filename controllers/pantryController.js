const Ingredient = require('../models/Ingredient')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')

const getAllIngredients = async (req, res) => {
    res.send("Get all ingredients")
}
const getIngredient = async (req, res) => {
    res.send("Get ingredient")
}
const addIngredient = async (req, res) => {
    res.send("Add Ingredient")
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
