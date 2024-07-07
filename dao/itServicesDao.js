// dao/itServicesDao.js
const ITservice = require('../models/ITServicesModel');
const ITCaseStudiesModel = require('../models/ITCaseStudiesModel');
const CommonDao = require('../dao/commonDao/commonDao');
const Image = require('../models/ImageModel');
/**
 * ITServicesDao: Provides the methods for CRUD operations.
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
    async updateITService( updateData) {
        try {
            const updatedService = await this.commonDao.saveData( updateData, ITservice);

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

    /**
     * This method used for getting the ITservices by filter.
     * 
     * @author Vishal
     * @since 07 jul 2024
     * @param {*}  
     * @returns 
     */
    async getITServices(requestFilter) {
        try {
            let query = {};
            
            if (requestFilter.id != null && requestFilter.id !== '') {
                query.id = id;
            }
            
            if (requestFilter.status != null && requestFilter.status !== '') {
                query.status = requestFilter.status;
            }
            
            // If both id and status are null, undefined, or empty, return all services
            if (Object.keys(query).length === 0) {
                query = {}; // This line is optional as it's already an empty object
            }
            
            const itServices = await ITservice.findAll({ where: query });
            return itServices;
        } catch (error) {
            console.error('Error getting IT services:', error);
            throw new Error('Error getting IT services: ' + error.message);
        }
    }


    /**
     * This method used for save the ITCaseStudies.
     * 
     * @author Vishal
     * @since 07 jul 2024
     * @param {*}  
     * @returns 
     */
    async saveCaseStudy(requestData, fileData)
    {
        try {
            // Check if the email already exists
            const existingCaseStudy = await ITCaseStudiesModel.findOne({ where: { heading: requestData.heading } });
            if (existingCaseStudy) {
                return {
                    status: 409,
                    message:  `${requestData.heading} case study already exists`
                };
            }
            if (fileData) {
                const imageId = await this.commonDao.uploadImage(fileData); // Upload image and get image ID
                requestData.imageId = imageId; // Update requestData with image ID
            }
            const result = await this.commonDao.saveData(requestData, ITCaseStudiesModel);
            return {
                status: 201,
                message: 'IT case study saved successfully',
                data: result
            };
        }
        catch (error) {
            console.log(error);
            throw new Error('Error creating case study: ' + error.message);
        }

    }

    /**
     * This method used for update the ITCaseStudies.
     * @author Vishal
     * @since 07 jul 2024
     * 
     */
    async updateCaseStudy( updateData) {
        try {
            const updateCaseStudy = await this.commonDao.saveData( updateData, ITCaseStudiesModel);

            if (updateCaseStudy) {
                return {
                    status: 200,
                    message: 'Case study updated successfully',
                    data: updateCaseStudy
                };
            } else {
                return {
                    status: 404,
                    message: 'Case study not found'
                };
            }
        } catch (error) {
            console.error('Error updating Case study:', error);
            throw new Error('Error updating Case study: ' + error.message);
        }
    }

    /**
     * This method used for getting the IT Case Studies by filter.
     * 
     * @author Vishal
     * @since 07 jul 2024
     * @param {*}  
     * @returns 
     */
    async getITCaseStudies(requestFilter) {
        try {
            let query = {};
            
            if (requestFilter.id != null && requestFilter.id !== '') {
                query.id = requestFilter.id;
            }
            if (requestFilter.heading != null && requestFilter.heading !== '') {
                query.heading = requestFilter.heading;
            }
            if (requestFilter.status != null && requestFilter.status !== '') {
                query.status = requestFilter.status;
            }
            
            // If both id and status are null, undefined, or empty, return all services
            if (Object.keys(query).length === 0) {
                query = {}; // This line is optional as it's already an empty object
            }
            
            const itCaseStudies = await ITCaseStudiesModel.findAll({ where: query });
            return itCaseStudies;
        } catch (error) {
            console.error('Error getting Case studies:', error);
            throw new Error('Error getting Case studies: ' + error.message);
        }
    }
}

module.exports = ITServicesDao;
