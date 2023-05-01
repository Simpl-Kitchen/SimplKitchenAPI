const mongoose = require('mongoose')

const PantryIngredientSchema = new mongoose.Schema({
    ingredientReference: {
        type: mongoose.Types.ObjectId,
        ref: 'Ingredient',
        required: [true, 'please provide the ingredient to reference in the database'],
    },
    ingredientName: {
        type: String,
        required: [true, 'please provide the ingredient name']
    },
    amountinGrams: {
        type: Number,
        default: 1,
        required: [true, 'please provide the amount of the ingredient in grams']
    },
    amountinCups: {
        type: Number,
        default: 1,
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide a user']
    }
},
    { timestamps: true },
    { strict: false },
) // May need to change strict settings. Leaving as false for ease of testing. 


module.exports = mongoose.model('PantryIngredient', PantryIngredientSchema)