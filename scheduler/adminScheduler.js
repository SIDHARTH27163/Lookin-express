const schedule = require('node-schedule');
const AdminDao = require('../dao/adminDao');

const adminDao = new AdminDao();

// Schedule to check if admin is already logged in every minute
schedule.scheduleJob('*/1 * * * *', async () => {
    try {
        // Check if admin is already logged in
        const admin = await adminDao.getAdminByEmail('admin@example.com'); // Change to actual admin email
        if (!admin) {
            // Admin is not logged in, log in automatically
            await adminDao.loginAdmin('admin@example.com', 'adminpassword'); // Change to actual admin email and password
            console.log('Admin logged in automatically');
        } else {
            console.log('Admin is already logged in');
        }
    } catch (error) {
        console.error('Error checking admin login status:', error.message);
    }
});
