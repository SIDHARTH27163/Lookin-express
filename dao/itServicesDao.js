// dao/itServicesDao.js
const ITservice = require('../models/ITServicesModel');
const CommonDao = require('../dao/commonDao/commonDao');
const Image = require('../models/ImageModel');
/**
 * CommonDao: Provides common methods for CRUD operations.
 * @author Vishal
 * @since 06 jul 2024
 * 
 */
class ITServicesDao {
    constructor() {
        this.commonDao = new CommonDao();
    }

    async saveITService(serviceData, fileData) {
        try {
            const existingService = await ITservice.findOne({ where: { name: serviceData.name } });
            if (existingService) {
                return {
                    status: 409, // Conflict status code
                    message: `${serviceData.name} already exists`
                };
            }

            if (fileData) {
                const imageId = await this.commonDao.uploadImage(fileData); // Upload image and get image ID
                serviceData.imageId = imageId; // Update serviceData with image ID
            }

            const result = await this.commonDao.saveData(serviceData, ITservice);
            return {
                status: 201,
                message: 'IT Service saved successfully',
                data: result
            };
        } catch (error) {
            console.error('Error inserting IT services:', error);
            throw new Error('Error inserting IT services: ' + error.message);
        }
    }
    /**
 * CommonDao: Provides update functionality.
 * @author Sidharth Guleria
 * @since 06 jul 2024
 * 
 */
    async updateITService(idToUpdate, updateData) {
        try {
            const updatedService = await this.commonDao.saveData(idToUpdate, updateData, ITservice);

            if (updatedService) {
                return {
                    status: 200,
                    message: 'IT Service updated successfully',
                    data: updatedService
                };
            } else {
                return {
                    status: 404,
                    message: 'IT Service not found'
                };
            }
        } catch (error) {
            console.error('Error updating IT service:', error);
            throw new Error('Error updating IT service: ' + error.message);
        }
    }

    async getAllITServices() {
        try {
            const itServices = await ITservice.findAll();
            return itServices;
        } catch (error) {
            console.error('Error getting IT services:', error);
            throw new Error('Error getting IT services: ' + error.message);
        }
    }
}

module.exports = ITServicesDao;
