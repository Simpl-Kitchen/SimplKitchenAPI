const mongoose = require('mongoose')

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
        match: [
            /^https:\/\/spoonacular\.com\/cdn\/ingredients_\d{1,4}x\d{1,4}\/[a-zA-Z0-9_\-]+\.jpg$/,
            'not a valid ingredient image URL'
        ],
        // validate: {
        //     validator: function (v) {
        //       return /^https:\/\/spoonacular\.com\/cdn\/ingredients_\d{1,4}x\d{1,4}\/[a-zA-Z0-9_\-]+\.jpg$/.test(v);
        //     },
        //     message: (props) => `${props.value} is not a valid ingredient image URL`,
        //   },
    },
    amount: {
        type: Number,
        default: 1
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

module.exports = mongoose.model('Ingredient', IngredientSchema)