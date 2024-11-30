const {httpServer} = require('./app')
const dotenv = require('dotenv');
const {connectDB} = require("./config/db");
const {redisConnect} = require("../src/config/redis");

dotenv.config();



const startServer = async () => {
  try {
    await connectDB();
    await redisConnect();
    await httpServer.listen(process.env.PORT, () => {
      console.log(`Server is running on http://localhost:`);
    });
  
  } catch (error) {
    console.error('Failed to connect to the database:', error);
  }
};

startServer();
