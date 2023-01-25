// pantry routes
const express = require('express')
const router = express.Router()

const {
    getAllIngredients, 
    getIngredient, 
    addIngredient
} = require('../controllers/pantryController')

//router.get('/ingredients', getAllIngredients)
router.route('/ingredients').get(getAllIngredients).post(addIngredient)
router.route('/ingredients/:id').get(getIngredient)

module.exports = router