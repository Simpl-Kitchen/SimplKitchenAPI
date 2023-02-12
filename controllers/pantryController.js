const Ingredient = require('../models/Ingredient')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')
//const { NotFoundError } = require('../../JS_Node_Tutorials/node-express-course/06.5-jobster-api/starter/errors')

const getAllIngredients = async (req, res) => {
    queryObject = {
        createdBy: req.user.userId
    }
    let result = Ingredient.find(queryObject)
    const ingredients = await result

    res.status(StatusCodes.OK).json({ ingredients })
    //console.log(queryObject)
    //res.send("Get all ingredients")
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
    //res.send("Get ingredient")
}
const addIngredient = async (req, res) => {
    console.log(req.body)
    console.log(req.user)
    req.body.createdBy = req.user.userId
    const ingredient = await Ingredient.create(req.body)
    res.status(StatusCodes.CREATED).json({ ingredient })


    // Regenerate recipes
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

module.exports = {
    getAllIngredients,
    getIngredient,
    addIngredient,
    updateIngredient,
    deleteIngredient
}
