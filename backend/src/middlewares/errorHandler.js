const statusCodes = require('../utils/constants');

const errorHandler = (err, req, res, next) => {   
    console.error('Error: ', err); // Log the error for debugging purposes

    const statusCode = err.statusCode || statusCodes.INTERNAL_SERVER_ERROR;
    const message = err.message || 'Something went wrong try again later';

    return res.status(statusCode).json({
        success: false,
        message: message,
    });
}

module.exports = errorHandler;