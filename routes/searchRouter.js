const express = require('express')
const router = express.Router()

const {
    searchIngredients,
    searchIngredientInformation,
    searchRecipes,
    //searchByPantry,
    searchGroceryProducts,
    searchGroceryProductInformation,
    searchGroceryProductByUPC
} = require('../controllers/searchController')

router.get('/ingredients', searchIngredients)
router.get('/ingredient/id/:id', searchIngredientInformation)

router.get('/grocery/products', searchGroceryProducts)
router.get('/grocery/product/id/:id', searchGroceryProductInformation)
router.get('/grocery/product/upc/:upc', searchGroceryProductByUPC)

router.get('/recipes', searchRecipes)

module.exports = router