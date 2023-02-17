const express = require('express')
const router = express.Router()

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

router.route('/').post(addIngredient).get(getAllIngredients)
router.route('/:id').get(getIngredient).delete(deleteIngredient).patch(updateIngredient)
router.route('/Recipe').post(addRecipe).get(getAllRecipes)
router.route('/Recipe/:id').get(getRecipe).delete(deleteRecipe).patch(updateRecipe)

module.exports = router
