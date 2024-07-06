const ITServicesDao = require('../dao/itServicesDao');

class ITServicesController
{
    constructor() {
        this.ITServicesDao = new ITServicesDao();
    }

     /**
     * This API used for create or Update IT services by logged in Admin.
     * 
     * @author Vishal
     * @since 01 July 2024
     * @param {*} serviceData 
     * @returns 
     */
     async saveITService(req, res) {
        try {
            const serviceData = req.body;
            const fileData = req.file; // Access uploaded file data

            const result = await this.ITServicesDao.saveITService(serviceData, fileData);
            res.status(201).json(result);
        } catch (error) {
            console.error('Error in API:', error);
            res.status(500).json({ message: error.message });
        }
    }

    /**
     * This API used for get all ITservices.
     * 
     * @author Vishal
     * @since 02 July 2024
     * @param {*} serviceData 
     * @returns 
     */
    async itServices(req, res) {
    

        try {
            const result = await this.ITServicesDao.getAllITServices();
            res.json(result);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
 /**
     * This API used for updating the ITservices.
     * 
     * @author Vishal
     * @since 06 July 2024
     * @param {*} serviceData 
     * @returns 
     */

// itServicesController.js

async updateitServices(req, res) {
    try {
        const { id } = req.params; // Extract id from request params
        const updateData = req.body; // Assuming update data comes from request body

        const result = await this.ITServicesDao.updateITService(id, updateData); // Pass id and updateData

        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

}
module.exports = ITServicesController;
