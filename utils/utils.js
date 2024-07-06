// utils.js
module.exports = {
    generateId(tableName) {
        const prefix = tableName.substring(0, 3).toLowerCase();
        return `${prefix}${Date.now()}${Math.floor(Math.random() * 1000)}`;
    }
};
