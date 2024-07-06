const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

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
     * @param {Model} modelName - Sequelize model for the object type.
     * @returns {Promise<Object>} - Saved or updated object.
     */
    async saveData(requestData, modelName) {
        try {
            requestData.id = CommonDao.generateId(modelName.name);
            return await this.save(requestData, modelName);
        } catch (err) {
            throw err;
        }
    }

    /**
     * Saves a new object using the provided model.
     * @param {Object} requestData - Data to be saved.
     * @param {Model} modelName - Sequelize model for the object type.
     * @returns {Promise<Object>} - Newly created object.
     */
    async save(requestData, modelName) {
        try {
            const newDataCreate = await modelName.create(requestData);
            return newDataCreate;
        } catch (err) {
            throw err;
        }
    }
 
    /**
     * Updates an existing object by its ID using the provided model.
     * @param {String} idToUpdate - ID of the object to update.
     * @param {Object} updatedData - Updated data to replace the existing object.
     * @param {Model} modelName - Sequelize model for the object type.
     * @returns {Promise<Object|null>} - Updated object if found, null if not found.
     */
    async update(idToUpdate, updatedData, modelName) {
        try {
            const updatedObject = await modelName.update(updatedData, {
                where: { id: idToUpdate }
            });
            if (updatedObject) {
                return updatedObject;
            } else {
                console.log('Data not found.');
                return null; // Return null if object with idToUpdate is not found
            }
        } catch (err) {
            throw err;
        }
    }
    /**
     * Provide the ID generator operation
     * 
     * @author Sidharth Guleria
     * @since 04 Jul 2024
     *  
     * @returns 
     */
    static generateId(tableName) {
        const prefix = tableName.substring(0, 3).toLowerCase();
        return `${prefix}${Date.now()}${Math.floor(Math.random() * 1000)}`;
    }

    // upload 
    static getUploadMiddleware() {
        const storage = multer.diskStorage({
            destination: 'uploads/', // Adjust destination folder as needed
            filename: (req, file, cb) => {
                const uniqueFilename = uuidv4();
                const extension = path.extname(file.originalname);
                cb(null, `${uniqueFilename}${extension}`);
            }
        });

        return multer({ storage: storage });
    }

    async uploadImage(fileData) {
        try {
            const uniqueFilename = uuidv4(); // Generate unique filename using UUID
            const extension = path.extname(fileData.originalname);
            const imagePath = `uploads/${uniqueFilename}${extension}`; // Adjust path as needed

            // Save file to disk
            await fs.promises.writeFile(imagePath, fileData.buffer);

            // Return the image path or URL
            return imagePath;
        } catch (error) {
            console.error('Error uploading image:', error);
            throw new Error('Error uploading image: ' + error.message);
        }
    }
}

module.exports = CommonDao;
