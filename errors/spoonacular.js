const { StatusCodes } = require('http-status-codes');
const CustomAPIError = require('./custom-api');

class SpoonacularError extends CustomAPIError {
  constructor(message, status) {
    super(message);
    this.statusCode = status;

  }
}

module.exports = SpoonacularError;
