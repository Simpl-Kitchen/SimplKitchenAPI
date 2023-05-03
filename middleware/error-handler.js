// Import the HTTP status codes library
const { StatusCodes } = require('http-status-codes')
// Define an error handling middleware function with four parameters
const errorHandlerMiddleware = (err, req, res, next) => {

    // Create a custom error object with a default status code and message
  let customError = {
    // set default
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong try again later'
  }
  // If the error is a Mongoose validation error, update the custom error object with the error message and status code
  if (err.name === 'ValidationError') {
    console.log(Object.values(err.errors));
    customError.msg = Object.values(err.errors).map((items) => items.message).join(',')
    customError.statusCode = 400
  }
  // If the error is a MongoDB duplicate key error, update the custom error object with a message about the duplicate value and status code
  if (err.code && err.code === 11000) {
    customError.msg = `Duplicate value entered for ${Object.keys(err.keyValue)} field, please choose another value`
    customError.statusCode = 400
  }
  // If the error is a Mongoose CastError, update the custom error object with a message about the missing item and status code
  if (err.name === 'CastError') {
    customError.msg = `No item found with id ${err.value}`
    customError.statusCode = 404
  }
// If the error is a Spoonacular error, update the custom error object with a message about the error and the status code
  if (err.name === 'Spoonacular') {
    console.log("Inside")
    customError.msg = `Spoonacular error`
    customError.statusCode = err.statusCode
  }
// Send the custom error object as a JSON response with the appropriate status code
  return res.status(customError.statusCode).json({ msg: customError.msg })
}
// Exports 
module.exports = errorHandlerMiddleware
