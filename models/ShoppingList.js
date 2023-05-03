// Imports 
const mongoose = require('mongoose')
// Cost Schema 
const estimatedCostSchema = new mongoose.Schema({
    value: Number,
    unit: String
  }); 

// Ingredient Schema 
  const ingredientSchema = new mongoose.Schema({
    ingredientID: Number,
    ingredientName: String,
    amount: Number,
    unit: String,
    estimatedCost: estimatedCostSchema,
    aisle: String,
    image: String,
});
// Shopping List Schema
const ShoppingListSchema = new mongoose.Schema({
    ingredients: [ingredientSchema],
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide a user'],
    },
    cost: Number,        
    
})
// Shopping List Model
ShoppingListSchema.methods.getTotalCost = function() {
    let totalCost = 0;
    

    this.ingredients.forEach(ingredient => {
        totalCost += ingredient.estimatedCost.value;
    });

    return totalCost;
};
// Shopping List Schema
ShoppingListSchema.pre('save', function(next) {
    this.cost = this.getTotalCost();
    next();
})
// Exports
const ShoppingList = mongoose.model('ShoppingList', ShoppingListSchema);
module.exports = ShoppingList;