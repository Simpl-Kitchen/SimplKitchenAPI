// Imports
const mongoose = require('mongoose')

const CostSchema = new mongoose.Schema({
    value: {
        type: Number,
        //required: [true, 'please provide the cost per gram']
    },
    unit: {
        type: String,
        //required: [true, 'please provide the total cost']
    }
});
// Ingredient Schema
const IngredientSchema = new mongoose.Schema({
    ingredientID: {
        type: Number,
        required: [true, 'please provide the ingredient Id'],
    },
    ingredientName: {
        type: String,
        required: [true, 'please provide the ingredient name']
    },
    amount: {
        type: Number,
        required: [true, 'please provide the amount of the ingredient']
    },
    unit: {
        type: String,
        //required: [true, 'please provide the unit of measurement']
        defualt: ''
    },
    cost: {
        type: CostSchema,
        //required: [true, 'please provide the cost information']
    },
    image: String,
})




const RecipeSchema = new mongoose.Schema({
    recipeID: {
        type: String,
        required: [true, 'please provide the recipe Id'],
    },
    recipeTitle: {
        type: String,
        required: [true, 'please provide the Recipe title']
    },
    image: {
        type: String,
        required: [true, 'please provide the url for recipe picture'],
    },
    // imageType: {
    //     type: String,
    //     required: true
    // },
    usedIngredientCount: Number,
    missedIngredientCount: Number,
    missedIngredients: {
        type: [IngredientSchema],
        required: [true, 'please provide the missed ingredients'],
    },
    usedIngredients: {
        type: [IngredientSchema],
        required: [true, 'please provide the used ingredients'],
    },
    // unusedIngredients: {
    //     type: [IngredientSchema],
    //     required: [true, 'please provide the unused ingredients'],
    // },
    totalCost: {
        type: CostSchema,
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide a user']
    }
},
    { timestamps: true },
    { strict: false },
) 
// May need to change strict settings. Leaving as false for ease of testing. 

RecipeSchema.methods.incrementAmount = async function () {
    this.amount += 1;
    await this.save();
}

RecipeSchema.methods.decrementAmount = async function () {
    this.amount -= 1;
    await this.save();
}
// Exports 
module.exports = mongoose.model('Recipe', RecipeSchema)