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
    async saveITService(req, res)
    {
        try {
            // If request data have id then we update the IT Service otherwise we create a new IT service.
            if(req.body.id)
            {
                const result = await this.ITServicesDao.updateITService(req.body);
            }
            else{
                const result = await this.ITServicesDao.saveITService(req.body);
            }
            res.status(201).json(result);
        } catch (err) {
            console.error('Error in API:', err);
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
            const result = await this.ITServicesDao.getAllITervices();
            res.json(result);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

}
module.exports = ITServicesController;
