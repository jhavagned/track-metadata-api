import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

/**
 * MongoDB Connection Configuration
 * 
 * This file establishes a connection to the MongoDB database using Mongoose.
 * It retrieves database credentials and configurations from environment variables.
 */

const MONGODB_URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@trackmetacluster.hgvsm.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=${process.env.APP_NAME}`;

/**
 * Connect to MongoDB
 * 
 * Establishes a connection to the MongoDB database. If the connection fails,
 * an error message is logged to the console, and the process exits with a failure code.
 * 
 * @function connectDB
 */
const connectDB = async () => {
    try {
        // Connect to MongoDB using the connection string
        await mongoose.connect(MONGODB_URI);
        console.log('MongoDB connected successfully!');
    } catch (error) {
        // Log error details and exit process on failure
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1); // Exit with failure
    }
};

// Export the connectDB function for use in the application
export default connectDB;
