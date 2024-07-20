const statusCodes = require('../utils/constants');
const CustomAPIError = require('./customApi');


class ForbiddenError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = statusCodes.FORBIDDEN;
  }
}

module.exports = ForbiddenError;