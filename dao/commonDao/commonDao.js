const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const Image = require('../../models/ImageModel');
const Session = require('../../models/SessionModel');
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
    async saveData(requestData, modelName ) {
        try {
          
            if(!requestData.id){
                 return await this.saveData(requestData, modelName );
        
            }else{

            return await this.update(requestData, modelName );
        }
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
     * @param {String} id - ID of the object to update.
     * @param {Object} Data - Updated data to replace the existing object.
     * @param {Model} model - Sequelize model for the object type.
     * @returns {Promise<Object|null>} - Updated object if found, null if not found.
     */
    async update( Data, model) {
        try {
            const updatedObject = await model.update(Data, {
                where: { id: Data.id }
            });
            if (updatedObject) {
                return updatedObject;
            } else {
               
                return null; // Return null if object with id is not found
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
    // In CommonDao.js
/**
 * CommonDao: Provides common methods for CRUD operations.
 * @author Sidharth Guleria
 * @since 06 jul 2024
 * 
 */
static getUploadMiddleware() {
    const storage = multer.memoryStorage(); // Use memory storage

    return multer({ storage: storage });
}

async uploadImage(fileData) {
    try {
        if (!fileData.buffer) {
            throw new Error('File buffer is undefined');
        }

        const uniqueFilename = uuidv4(); // Generate unique filename using UUID
        const extension = path.extname(fileData.originalname);
        const imagePath = `uploads/${uniqueFilename}${extension}`; // Adjust path as needed

        // Save file to disk
        await fs.promises.writeFile(imagePath, fileData.buffer); // Use fileData.buffer instead of fileData.path

        // Save image details in the database
        const image = await Image.create({
            filename: fileData.originalname,
            path: imagePath,
            mimetype: fileData.mimetype,
            size: fileData.size
        });

        return image.id; // Return image ID
    } catch (error) {
        console.error('Error uploading image:', error);
        throw new Error('Error uploading image: ' + error.message);
    }
}
async logout(req) {
    try{
        if (req.session) {
            const sessionId = req.session.id; // Assuming session ID is stored in req.session.id

            req.session.destroy(async err => {
                if (err) {
                    throw new Error('Error logging out: ' + err.message);
                }

                // Delete session details from the session table
                try {
                    await Session.destroy({ where: { sessionId } });
                } catch (err) {
                    throw new Error('Error deleting session details: ' + err.message);
                }
            });

            return { status: 200, message: 'Logout successful' };
        } else {
            return { status: 400, message: 'No active session' };
        }
   } catch (error) {
        
        throw new Error('Error during logout: ' + error.message);
    }
}
}

module.exports = CommonDao;
