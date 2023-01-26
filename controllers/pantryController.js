const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')
const Pantry = require('../models/Pantry')
const User = require('../models/User')

const Ingredient = require('../models/Ingredient')

const getAllIngredients = async (req,res) => {
    const queryObject = {
        // Use authenticaiton to change to req.user.userID
        ownedBy: '63cf029cb85efb1f1822521d'
      }
   
    let result = Pantry.find(queryObject)
    let pantry = await result
    
    console.log(pantry);
    res.status(StatusCodes.OK).json({pantry})
}
const getIngredient = async (req, res) => {
  res.send('getIngredient')
}
const addIngredient = async (req, res) => {
  //res.send('createIngredient')

  const userID = '63cf4154cd27e45d2cb5c38a'
  const searchIngredientID = '63cdacc67eb0e3588cbf2d38'

  const queryObject = {
    // Use authenticaiton to change to req.user.userID
    ownedBy: '63cf4154cd27e45d2cb5c38a'
  }

  let user = await User.findById(userID)
  let ingredient = await Ingredient.findById(searchIngredientID)

  let result = Pantry.find(queryObject)
  let pantry = await result


  
  console.log(user);
  //console.log(pantry);

  const pantryIngredients = pantry[0].ingredients

  pantry[0].ingredients.push(ingredient)

  console.log(pantryIngredients);
  //console.log(ingredient);

  res.send('createIngredient')
}
// module.exports = getAllIngredients
module.exports = {
    getAllIngredients, 
    getIngredient,
    addIngredient
}