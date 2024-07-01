/**
 * Purpose: The code defines a ITServicesDao class responsible for interacting with a data store, 
 * presumably to save IT services and other operations.
 * 
 * @author Vishal
 */

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const commonDao = require('../dao/commonDao/commonDao');
const ITservice = require('../models/ITServicesModel'); // Assuming this is your Sequelize model for IT services

class ITServicesDao {
    constructor() {
        this.commonDao = new commonDao(); 
    }

    async saveITService(serviceData) {
        try {
            // Check if the service already exists
            const existingService = await ITservice.findOne({ where: { name: serviceData.name } });
            if (existingService) {
                return {
                    status: 409, // Conflict status code
                    message: `${serviceData.name} already exists`
                };
            }

            // Create a new service using common mehtod saveData
            const newService = await this.commonDao.saveData(serviceData, ITservice);

            return {
                status: 201, // Created status code
                message: 'Service created successfully',
                serviceId: newService.id // Assuming newService has an 'id' attribute
            };
        } catch (error) {
            throw new Error('Error creating IT service: ' + error.message);
        }
    }
}