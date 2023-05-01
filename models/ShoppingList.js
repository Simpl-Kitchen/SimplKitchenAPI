const mongoose = require('mongoose')

const estimatedCostSchema = new mongoose.Schema({
    value: Number,
    unit: String
  }); 


  const ingredientSchema = new mongoose.Schema({
    ingredientID: Number,
    ingredientName: String,
    amount: Number,
    unit: String,
    estimatedCost: estimatedCostSchema,
    aisle: String,
    image: String,
});

const ShoppingListSchema = new mongoose.Schema({
    ingredients: [ingredientSchema],
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide a user'],
    },
    cost: Number,        
    
})

ShoppingListSchema.methods.getTotalCost = function() {
    let totalCost = 0;
    

    this.ingredients.forEach(ingredient => {
        totalCost += ingredient.estimatedCost.value;
    });

    return totalCost;
};

ShoppingListSchema.pre('save', function(next) {
    this.cost = this.getTotalCost();
    next();
})

const ShoppingList = mongoose.model('ShoppingList', ShoppingListSchema);
module.exports = ShoppingList;