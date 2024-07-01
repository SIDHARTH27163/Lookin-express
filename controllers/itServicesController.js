const ITServicesDao = require('../dao/itServicesDao');

class ITServicesController
{
    constructor() {
        this.ITServicesDao = new ITServicesDao();
    }

    async saveITService(req, res)
    {
        try {
            const result = await this.ITServicesDao.saveITService(req.body);
            res.status(201).json(result);
        } catch (err) {
            console.error('Error in API:', err);
            res.status(500).json({ message: error.message });
        }
    }

}
