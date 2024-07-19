const CustomAPIError = require('./customApi');
const BadRequestError = require('./badRequest');
const UnauthenticatedError = require('./unauthenticated');

module.exports = {
    CustomAPIError,
    UnauthenticatedError,
    BadRequestError,
}