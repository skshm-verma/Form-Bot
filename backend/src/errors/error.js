const CustomAPIError = require('./customApi');
const BadRequestError = require('./badRequest');
const UnauthenticatedError = require('./unauthenticated');
const ForbiddenError = require('./forbidden');

module.exports = {
    CustomAPIError,
    UnauthenticatedError,
    BadRequestError,
    ForbiddenError
}