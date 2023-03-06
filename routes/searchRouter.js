const express = require('express')
const router = express.Router()

const {
    searchIngredients,
    getIngredientInformation,
    searchRecipes,
    searchByPantry,
} = require('../controllers/searchController')

router.get('/ingredients', searchIngredients)
router.get('/ingredient', getIngredientInformation)
router.get('/recipes', searchRecipes)
router.get('/pantryRecipe', searchByPantry)

module.exports = router