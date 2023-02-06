const mongoose = require('mongoose')

const IngredientSchema = new mongoose.Schema({
    foodId: {
        type: String,
        required: [true, 'please provide the food Id'],
    },
    uri: {
        type: String,
    },
    label: {
        type: String,
        required: [true, 'please provide the name of the ingredient']

    },
    nutrients: {
        type: Map,
        of: String
    },
    brand: {
        type: String,

    },
    category: {
        type: String,
        enum: ['Generic foods', 'packaged-foods', 'generic-meals', 'fast-foods'],
    },
    categoryLabel: {
        type: String,
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
}, { strict: false }) // May need to change strict settings. Leaving as false for ease of testing. 

module.exports = mongoose.model('Ingredient', IngredientSchema)