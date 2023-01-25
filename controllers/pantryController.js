const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')
const Pantry = require('../models/Pantry')

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
  res.send('createIngredient')
}
// module.exports = getAllIngredients
module.exports = {
    getAllIngredients, 
    getIngredient,
    addIngredient
}