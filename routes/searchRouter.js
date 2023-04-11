const express = require('express')
const router = express.Router()

const searchController = require('../controllers/searchControllers')

// Ingredient search
router.get('/ingredients', searchController.searchIngredients)
router.get('/ingredient/id/:id', searchController.searchIngredientInformation)

// Grocery search
router.get('/grocery/products', searchController.searchGroceryProducts)
router.get('/grocery/product/id/:id', searchController.searchGroceryProductInformation)
router.get('/grocery/product/upc/:upc', searchController.searchGroceryProductByUPC)

// Recipe search
router.get('/recipes', searchController.searchRecipes)
router.get('/recipes/random', searchController.generateRecipes)

module.exports = router