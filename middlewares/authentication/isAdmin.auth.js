// External Dependencies
const jwt = require('jsonwebtoken');
const createError = require('http-errors');

// Admin Authentication
const isAdmin = (req, res, next) => {
    try {
        const { authorization } = req.headers;
        const token = authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { role } = decoded;
        if (role === 'admin') {
            next();
        } else {
            return res.status(403).json({ message: 'Only admin can access this.' });
        }
    } catch (error) {
        next(createError(403, 'Sorry. You are not able to access this.'));
    }
}

// Export Module
module.exports = isAdmin;