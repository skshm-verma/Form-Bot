const statusCodes = require('../utils/constants');
const CustomAPIError = require('./custom-api');


class UnauthenticatedError extends CustomAPIError {
    constructor(message) {
      super(message);
      this.statusCode = statusCodes.UNAUTHORIZED;
    }
  }
  
  module.exports = UnauthenticatedError;