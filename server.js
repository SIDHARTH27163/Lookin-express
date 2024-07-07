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
const session = require('express-session');
app.use(bodyParser.json());
app.use(session({
  secret: 'sdjfvfvcvwhcv sbncvsdghwetydfwgh12123123', // Replace with a secure secret key
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));
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
    // app.listen(port, () => {
    //   console.log(`Server running on http://localhost:${port}`);
    // });