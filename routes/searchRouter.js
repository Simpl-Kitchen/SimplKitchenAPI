const express = require('express')
const router = express.Router()

const {
    searchIngredients,
    searchRecipes,
    } = require('../controllers/searchController')

router.get('/ingredients', searchIngredients)

module.exports = router