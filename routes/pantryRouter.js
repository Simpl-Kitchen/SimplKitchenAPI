const express = require('express')
const router = express.Router()

const {
    getAllIngredients,
    getIngredient,
    addIngredient,
    updateIngredient,
    deleteIngredient,
    addRecipe,
    getRecipe,
} = require("../controllers/pantryController")

router.route('/').post(addIngredient).get(getAllIngredients)
router.route('/:id').get(getIngredient).delete(deleteIngredient).patch(updateIngredient)
router.route('/').post(addRecipe).get(getRecipe)

module.exports = router
