// middleware/authMiddleware.js
/**
 * Middleware to check if the user is logged in.
 * 
 * @author Sidharth Guleria
 * @since 07 July 2024
 * 
 * @returns 
 */
module.exports = function isLoggedIn(req, res, next) {
    if (req.session && req.session.adminId) {
        next();
    } else {
        res.status(401).json({ message: 'Unauthorized. Please log in.' });
    }
};
