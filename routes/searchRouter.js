const express = require('express')
const router = express.Router()

const {
    searchIngredients,
    searchIngredientInformation,
    searchRecipes,
    searchByPantry,
} = require('../controllers/searchController')

router.get('/ingredients', searchIngredients)
router.get('/ingredient/properties/:id', searchIngredientInformation)
router.get('/recipes', searchRecipes)
router.get('/pantryRecipe', searchByPantry)

module.exports = router