// Ingredient controller
const Ingredient = require('../models/Ingredient')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')

const searchIngredients = async (req,res) => {
    const { search, foodGroup } = req.query
    
    console.log(req.query);
    const queryObject = {}

    if (search) {
        queryObject.name = { $regex: search, $options: 'i' }
      }

    if (foodGroup && foodGroup !== 'all') {
        queryObject.food_group = foodGroup
    }

      let result = Ingredient.find(queryObject)

    const ingredients = await result


    res.status(StatusCodes.OK).json({ingredients})
}

module.exports = searchIngredients