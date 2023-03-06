const { StatusCodes } = require('http-status-codes');
const CustomAPIError = require('./custom-api');

class SpoonacularError extends CustomAPIError {
  constructor(err) {
    super(err);
    this.statusCode = err.status;

  }
}

module.exports = SpoonacularError;
