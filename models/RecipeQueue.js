// Imports 
const mongoose = require('mongoose')
// Cost Schema
const CostSchema = new mongoose.Schema({
  value: {
      type: Number,
  },
  unit: {
      type: String,
  },
  servings: {
      type: Number,
  }
});
// Ingredient Schema 
const ingredientSchema = new mongoose.Schema({
    id: Number,
    amount: Number,
    unit: String,
    name: String,
    originalName: String,
    image: String,
    cost: {
      type: CostSchema,
  },
  });

// Recipe Schema
const recipeSchema = new mongoose.Schema({
    id: {
      type: Number,
      required: true,
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
    cost: {
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
  );

// Exports
  module.exports = mongoose.model('RecipeQueue', recipeSchema);