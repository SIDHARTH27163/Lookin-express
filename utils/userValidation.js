// utils/userValidation.js
const dynamoDB = require('../database/dbConfig');
const tableName = 'users';

const checkUserExists = async (email, phone) => {
    const checkParams = {
        TableName: tableName,
        FilterExpression: 'email = :email OR phone = :phone',
        ExpressionAttributeValues: {
            ':email': email,
            ':phone': phone
        }
    };

    const result = await dynamoDB.scan(checkParams).promise();
    return result.Items.length > 0;
};

module.exports = {
    checkUserExists
};
