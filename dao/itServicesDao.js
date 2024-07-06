// itServicesDao.js

const ITservice = require('../models/ITServicesModel'); // Assuming this is your Sequelize model for IT services
const CommonDao = require('../dao/commonDao/commonDao');

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
                serviceData.image = fileData.path; // Update serviceData with imagePath
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


    async updateITService(idToUpdate, updateData) {
        try {
            const updatedService = await this.commonDao.update(idToUpdate, updateData, ITservice);

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
