// dao/userDao.js
const dynamoDB = require('../database/dbConfig');
const { v4: uuidv4 } = require('uuid');
const { checkUserExists } = require('../utils/userValidation');
const tableName = 'users';

const createUser = async (user) => {
    try {
        const userExists = await checkUserExists(user.email, user.phone);
        if (userExists) {
            throw new Error('User with the same email or phone already exists');
        }

        // Generate a UUID for the userID
        const userID = uuidv4();
        const params = {
            TableName: tableName,
            Item: {
                userID,
                name: user.name,
                email: user.email,
                phone: user.phone
            }
        };

        await dynamoDB.put(params).promise();
        return { message: 'User created successfully', user: { ...user, userID } };
    } catch (error) {
        if (error.code === 'ConditionalCheckFailedException') {
            throw new Error('User with the same email or phone already exists');
        }
        throw new Error('Error creating user: ' + error.message);
    }
};

const getUser = async (userID) => {
    const params = {
        TableName: tableName,
        Key: {
            userID
        }
    };
    try {
        const data = await dynamoDB.get(params).promise();
        return data.Item;
    } catch (error) {
        throw new Error('Error getting user: ' + error.message);
    }
};

const updateUser = async (userID, user) => {
    const params = {
        TableName: tableName,
        Key: {
            userID
        },
        UpdateExpression: 'set #name = :name, #email = :email',
        ExpressionAttributeNames: {
            '#name': 'name',
            '#email': 'email'
        },
        ExpressionAttributeValues: {
            ':name': user.name,
            ':email': user.email
        },
        ReturnValues: 'ALL_NEW'
    };
    try {
        const data = await dynamoDB.update(params).promise();
        return data.Attributes;
    } catch (error) {
        throw new Error('Error updating user: ' + error.message);
    }
};

const deleteUser = async (userID) => {
    const params = {
        TableName: tableName,
        Key: {
            userID
        }
    };
    try {
        await dynamoDB.delete(params).promise();
        return { message: 'User deleted successfully' };
    } catch (error) {
        throw new Error('Error deleting user: ' + error.message);
    }
};

module.exports = {
    createUser,
    getUser,
    updateUser,
    deleteUser
};
