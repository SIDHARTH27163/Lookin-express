// middleware/authMiddleware.js
/**
 * Middleware to check if the user is logged in.
 * 
 * @author Sidharth Guleria
 * @since 07 July 2024
 * 
 * @returns 
 */
// middleware/authMiddleware.js
const authMiddleware = (req, res, next) => {
    if (req.session && req.session.adminId) {
        return res.status(400).json({ message: 'User already logged in' });
    }
    next();
};

module.exports = authMiddleware;
