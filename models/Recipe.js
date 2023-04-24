const mongoose = require('mongoose')

const RecipeSchema = new mongoose.Schema({
    recipeID: {
        type: String,
        required: [true, 'please provide the ingredient Id'],
    },
    recipeTitle: {
        type: String,
        required: [true, 'please provide the ingredient name']
    },
    image: {
        type: String,
        required: [true, 'please provide the url for ingredient picture'],
    },
    imageType: { 
        type: String, 
        required: true 
    },
    usedIngredients: {
        type: [Number],
        required: [true, 'please provide the used ingredient Ids'],
    },
    missedIngredients: {
        type: [Number],
        required: [true, 'please provide the missed ingredient Ids'],
    },
    unusedIngredients: {
        type: [Number],
        required: [true, 'please provide the unused ingredient Ids'],
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

RecipeSchema.methods.incrementAmount = async function () {
    this.amount += 1;
    await this.save();
}

RecipeSchema.methods.decrementAmount = async function () {
    this.amount -= 1;
    await this.save();
}

module.exports = mongoose.model('Recipe', RecipeSchema)