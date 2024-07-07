// utils.js
/**
 *  Provides common methods for genratibng id .
 * @author Sidharth Guleria
 * @since 06 jul 2024
 * 
 */
module.exports = {
    generateId(tableName) {
        const prefix = tableName.substring(0, 3).toLowerCase();
        return `${prefix}${Date.now()}${Math.floor(Math.random() * 1000)}`;
    }
};
