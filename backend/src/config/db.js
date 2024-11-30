const mongoose = require('mongoose');
const {DB_NAME} = require('../utils/constant')
const dotenv = require('dotenv');
dotenv.config();

let connectionInstance = null;

const connectDB = async () => {
    if (connectionInstance) {
        console.log("Using existing MongoDB connection.");
        return connectionInstance;
      }
    try {
        connectionInstance = await mongoose.connect("mongodb://root:root@localhost:27017/DevBumble?authSource=admin")
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
        return connectionInstance;
    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
        process.exit(1)
    }
}

module.exports= {connectDB}