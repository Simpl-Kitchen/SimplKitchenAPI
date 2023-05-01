const mongoose = require('mongoose')


const ingredientSchema = new mongoose.Schema({
    id: Number,
    amount: Number,
    unit: String,
    originalName: String,
    image: String,
  });


const recipeSchema = new mongoose.Schema({
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    image: String,
    imageType: String,
    usedIngredientCount: Number,
    missedIngredientCount: Number,
    missedIngredients: [ingredientSchema],
    usedIngredients: [ingredientSchema],
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide a user']
    }
  },
    { timestamps: true },
    { strict: false },
  );


  module.exports = mongoose.model('RecipeQueue', recipeSchema);