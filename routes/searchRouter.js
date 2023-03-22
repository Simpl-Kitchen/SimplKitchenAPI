const express = require('express')
const router = express.Router()

const searchController = require('../controllers/searchControllers')
// const {
//     searchIngredients,
//     searchIngredientInformation,
//     searchRecipes,
//     //searchByPantry,
//     searchGroceryProducts,
//     searchGroceryProductInformation,
//     searchGroceryProductByUPC
// } = require('../controllers/searchController')

router.get('/ingredients', searchController.searchIngredients)
router.get('/ingredient/id/:id', searchController.searchIngredientInformation)

router.get('/grocery/products', searchController.searchGroceryProducts)
router.get('/grocery/product/id/:id', searchController.searchGroceryProductInformation)
router.get('/grocery/product/upc/:upc', searchController.searchGroceryProductByUPC)

router.get('/recipes', searchController.searchRecipes)

module.exports = router