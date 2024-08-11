// External Dependencies
const mongoose = require('mongoose');

// Database Configuration
const dbConfig = async () => {
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log('Database connection established.');
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

// Export Configuration
module.exports = dbConfig;