const mongoose = require('mongoose')

const IngredientSchema = new mongoose.Schema({
    foodId: {
        type: String,
        required: [true, 'please provide the food Id'],
    },
    label: {
        type: String,
        required: [true, 'please provide the name of the ingredient']

    },
    brand: {
        type: String,

    },
    category: {
        type: String,
        enum: ['generic-foods', 'packaged-foods', 'generic-meals', 'fast-foods'],
    },
    categoryLabel: {
        type: Number,
        enum: ['food', 'meal'],
        default: 'food'
    },
    foodContentsLabel: {
        type: String
    },
    image: {
        type: String,
    },
    amount: {
        type: Number
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide a user']
    }
}, { strict: false })

module.exports = mongoose.model('Ingredient', IngredientSchema)