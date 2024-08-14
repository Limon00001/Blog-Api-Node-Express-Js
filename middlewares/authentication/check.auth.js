// External Dependencies
const jwt = require('jsonwebtoken');
const createError = require('http-errors');

// Authentication
const checkAuth = (req, res, next) => {
    try {
        const { authorization } = req.headers;
        const token = authorization.split(' ')[1];

        // Token checking
        if (!token) {
            return res.status(401).json({
                error: {
                    message: 'Authentication failed!'
                }
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Cheking
        if (!decoded) {
            return res.status(401).json({
                error: {
                    message: 'Authentication failed!'
                }
            });
        }

        const { id, email, mobile, firstName, lastName, role } = decoded;
        req.id = id;
        req.email = email;
        req.mobile = mobile;
        req.firstName = firstName;
        req.lastName = lastName;
        req.role = role;
        next();
    } catch (error) {
        next(createError(404, 'Authentication failed!'));
    }
};

// Export Module
module.exports = {
    checkAuth
};