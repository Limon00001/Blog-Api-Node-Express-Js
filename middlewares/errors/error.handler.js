// External Dependencies
const createError = require('http-errors');

// 404 Not Found
const notFound = (req, res, next) => {
    next(createError(404, 'Not Found'));
}

// HeadersSent Error
const headersError = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err); // Delegate to default Express error handler if headers are already sent
    }
    res.status(err.status || 500).json({
        error: {
            message: err.message || 'Something went wrong!'
        },
    });
}


// Default Error
const defaultError = (err, req, res, next) => {
    res.status(err.status || 500).send({
        error: {
            message: err.message || 'Something went wrong!'
        },
    });
}

// Export Module
module.exports = {
    notFound,
    defaultError,
    headersError
}