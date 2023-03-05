const express = require('express')
const router = express.Router()

const {
    searchIngredients,
    searchRecipes,
    searchByPantry,
} = require('../controllers/searchController')

router.get('/ingredients', searchIngredients)
router.get('/recipes', searchRecipes)
router.get('/pantryRecipe', searchByPantry)

module.exports = router