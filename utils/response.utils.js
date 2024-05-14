const logger = require("../logger/logger")

exports.sendSuccessResponse = function (response, statusCode, message = "", data = {}) {
    try {
        logger.log(message)
        return response.status(statusCode).json({ statusCode: statusCode, message, data })
    } catch (error) {
        console.log(error);
    }
}

exports.sendErrorResponse = function (response, statusCode, error = {}) {
    logger.error(error)
    return response.status(statusCode).json({ statusCode: statusCode, error: error || error.message })
}