// Imports 
const mongoose = require('mongoose')
// Ingredient Schema
const IngredientSchema = new mongoose.Schema({
    ingredientId: {
        type: String,
        required: [true, 'please provide the ingredient Id'],
    },
    ingredientName: {
        type: String,
        required: [true, 'please provide the ingredient name']
    },
    pictureURL: {
        type: String,
        required: [true, 'please provide the url for ingredient picture'],
    },
    unit: {
        type: String,
    },
    amount: {
        type: Number,
        default: 1,
        min: [0, 'Amount must be a positive number']
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

IngredientSchema.methods.incrementAmount = async function () {
    this.amount += 1;
    await this.save();
}

IngredientSchema.methods.decrementAmount = async function () {
    this.amount -= 1;
    await this.save();
}
// Exports 
module.exports = mongoose.model('Ingredient', IngredientSchema)