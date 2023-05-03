// Imports 
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { UnauthenticatedError } = require('../errors')
// 
const auth = async (req, res, next) => {
  // check header
  const authHeader = req.headers.authorization
  // check if there is a token
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new UnauthenticatedError('Authentication invalid')
  }
  const token = authHeader.split(' ')[1]
// decode token
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    // attach the user to the job routes
    const testUser = (payload.userId === '63cd97a0a83f205ab0e7dab4')
    req.user = { userId: payload.userId, testUser }
    next()
    // Invalid authentication 
  } catch (error) {
    throw new UnauthenticatedError('Authentication invalid')
  }
}
// Exports 
module.exports = auth
