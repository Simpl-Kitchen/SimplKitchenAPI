// Ingredient routes
const express = require('express')
const router = express.Router()

const searchIngredients = require('../controllers/ingredientsController')

router.get('/ingredients/search', searchIngredients)

module.exports = router