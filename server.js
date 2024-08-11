/*
    Author: Monayem Hossain Limon
    Project: A Blog Site
    Description: This is blog project where will create api and api endpoints, authentication using jwt, set cookies, validation proccess, database as a MongoDB also gain better idea about reusable code and cleaner code.
    Date: 2024-08-02
*/

// External Dependencies
const dotenv = require('dotenv');
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');

// Internal Dependencies
const { notFound, defaultError } = require('./middlewares/errors/error.handler');
const dbConfig = require('./config/dbConfig');
const userRouter = require('./routes/users/users.routes');

// Instance Variables
const app = express();
dotenv.config();

// PORT Environment
const PORT = process.env.PORT || 5000

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Parse Cookies
app.use(cookieParser(process.env.COOKIE_SECRET));

// Routes
app.use('/api/v1/users', userRouter)


// Error Handling
// Not Found
app.use(notFound);

// Default Error Handler
app.use(defaultError);

// Server listening
app.listen(PORT, () => {
  console.log(`App running on http://localhost:${PORT}`);
  dbConfig();
});