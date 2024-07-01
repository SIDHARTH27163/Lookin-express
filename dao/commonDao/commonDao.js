const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
/**
 * CommonDao: Provides common methods for CRUD operations.
 * @author Vishal 
 * @since 29 June 2024
 * 
 */
class CommonDao {
    /**
     * Saves or updates an object based on the presence of an id in requestData.
     * @param {Object} requestData - Data to be saved or updated.
     * @param {Model} modelName - Mongoose model for the object type.
     * @returns {Promise<Object>} - Saved or updated object.
     */
    async saveData(requestData, modelName) {
        try {
            if (!requestData.id) {
                return await this.save(requestData, modelName);
            } else {
                return await this.update(requestData.id, requestData, modelName);
            }
        } catch (err) {
            throw err;
        }
    }

    /**
     * Saves a new object using the provided model.
     * @param {Object} requestData - Data to be saved.
     * @param {Model} modelName - Mongoose model for the object type.
     * @returns {Promise<Object>} - Newly created object.
     */
    async save(requestData, modelName) {
        try {
            const newDataCreate = await modelName.create(requestData);;
            return newDataCreate;
        } catch (err) {
            throw err;
        }
    }

    /**
     * Updates an existing object by its ID using the provided model.
     * @param {String} idToUpdate - ID of the object to update.
     * @param {Object} updatedData - Updated data to replace the existing object.
     * @param {Model} modelName - Mongoose model for the object type.
     * @returns {Promise<Object|null>} - Updated object if found, null if not found.
     */
    async update(idToUpdate, updatedData, modelName) {
        try {
            const updatedObject = await modelName.findByIdAndUpdate(idToUpdate, updatedData, { new: true });
            if (updatedObject) {
                return updatedObject;
            } else {
                console.log('Data not found.');
                return 'Data not found.'; // Return null if object with idToUpdate is not found
            }
        } catch (err) {
            throw err;
        }
    }
}