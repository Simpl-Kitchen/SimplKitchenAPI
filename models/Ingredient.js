const mongoose = require('mongoose')

// const IngredientSchema = new mongoose.Schema({
//     foodId: {
//         type: String,
//         //required: [true, 'please provide the food Id'],
//     },
//     uri: {
//         type: String,
//     },
//     label: {
//         type: String,
//         required: [true, 'please provide the name of the ingredient']

//     },
//     nutrients: {
//         type: Map,
//         of: String
//     },
//     brand: {
//         type: String,

//     },
//     category: {
//         type: String,
//         enum: ['generic-foods', 'packaged-foods', 'generic-meals', 'fast-foods'],
//     },
//     categoryLabel: {
//         type: String,
//         enum: ['food', 'meal'],
//         default: 'food'
//     },
//     foodContentsLabel: {
//         type: String
//     },
//     image: {
//         type: String,
//     },
//     amount: {
//         type: Number
//     },
//     createdBy: {
//         type: mongoose.Types.ObjectId,
//         ref: 'User',
//         required: [true, 'Please provide a user']
//     }
// },
// {timestamps: true}, 
// { strict: false },
// ) // May need to change strict settings. Leaving as false for ease of testing. 

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

module.exports = mongoose.model('Ingredient', IngredientSchema)