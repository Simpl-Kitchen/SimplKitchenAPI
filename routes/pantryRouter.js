const express = require('express')
const router = express.Router()

const {transform} = require('../middleware/transformRecipe')

const {
    //ingredients 
    getAllIngredients,
    getIngredient,
    addIngredient,
    updateIngredient,
    deleteIngredient,
    //recipes
    getAllRecipes,
    getRecipe,
    addRecipe,
    updateRecipe,
    deleteRecipe,
} = require("../controllers/pantryController")

router.route('/recipe/:id').get(getRecipe).delete(deleteRecipe).patch(updateRecipe)
router.route('/recipe').post(transform, addRecipe).get(getAllRecipes)
router.route('/:id').get(getIngredient).delete(deleteIngredient).patch(updateIngredient)
router.route('/').post(addIngredient).get(getAllIngredients)

module.exports = router
