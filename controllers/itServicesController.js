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

            console.log('serviceData:', serviceData); // Add this line
            console.log('fileData:', fileData); // Add this line

            if (!fileData) {
                throw new Error('No file uploaded');
            }

            const result = await this.ITServicesDao.saveITService(serviceData, fileData);
            res.status(201).json(result);
        } catch (error) {
            console.error('Error in API:', error);
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
async updateitServices(req, res) {
    try {
      
        const updateData = req.body; // Assuming update data comes from request body

        const result = await this.ITServicesDao.updateITService( updateData); // Pass id and updateData

        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

 /**
 * This API used for getting the ITservices by filter.
 * 
 * @author Vishal
 * @since 07 jul 2024
 * @param {*}  
 * @returns 
 */
async getAllITServices(req,res) {
    try {
        const requestFilter = req.body;
        const itServices = await ITServicesDao.getITServices(requestFilter);
        res.json(itServices);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

/**
 * This section for IT Case Studies
 */

/**
 * This API used for create IT case study by logged in Admin.
 * 
 * @author Vishal
 * @since 07 jul 2024
 * @param {*} serviceData 
 * @returns 
 */
async saveCaseStudies(req,res)
{
    try {
        const itCaseStudies = await ITServicesDao.saveCaseStudy(req.body); 
        res.json(itCaseStudies);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

/**
 * This API used for update IT case study by logged in Admin.
 * 
 * @author Vishal
 * @since 07 jul 2024
 * @param {*} serviceData 
 * @returns 
 */
async updateCaseStudies(req,res)
{
    try {
        const updateITCaseStudy = await ITServicesDao.updateCaseStudy(req.body); 
        res.json(updateITCaseStudy);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

 /**
 * This API used for getting the ITCaseStudies by filter.
 * 
 * @author Vishal
 * @since 07 jul 2024
 * @param {*}  
 * @returns 
 */
 async getAllITCaseStudies(req,res) {
    try {
        const requestFilter = req.body;
        const itCaseStudies = await ITServicesDao.getITCaseStudies(requestFilter);
        res.json(itCaseStudies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

}
module.exports = ITServicesController;
