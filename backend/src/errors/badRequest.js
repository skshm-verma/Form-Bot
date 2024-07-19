const statusCodes = require('../utils/constants');
const CustomAPIError = require('./custom-api');


class BadRequestError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = statusCodes.BAD_REQUEST;
  }
}

module.exports = BadRequestError;