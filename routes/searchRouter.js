const express = require('express')
const router = express.Router()

const {
    searchIngredients,
    searchIngredientInformation,
    searchRecipes,
    searchByPantry,
    searchGroceryProducts,
    searchGroceryProductInformation
} = require('../controllers/searchController')

router.get('/ingredients', searchIngredients)
router.get('/ingredient/properties/:id', searchIngredientInformation)

router.get('/grocery/products', searchGroceryProducts)
router.get('/grocery/product/properties', searchGroceryProductInformation)

router.get('/recipes', searchRecipes)
router.get('/pantryRecipe', searchByPantry)

module.exports = router