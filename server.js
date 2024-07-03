 /**
     * This file is used as entry point for the project 
     * 
     * @author Sidharth Guleria
     * @since 25 June 2024
     *  
     * @returns 
     */
const express = require('express');
const bodyParser = require('body-parser');
const createTables = require('./database/mysql/createTables');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const config = require('./config/config');
require('dotenv').config();
const app = express();
const port = config.server.port;

app.use(bodyParser.json());

// User routes
app.use('/api', userRoutes);
app.use('/admin', adminRoutes);

// Initialize database tables and start server
createTables()
  .then(() => {
    console.log('Initialization complete. Starting the server...');
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch(error => {
    console.error('Initialization failed:', error.message);
    process.exit(1);
  });
