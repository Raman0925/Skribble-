const redis = require('redis');
let redisClient = null;

const redisConnect = async() => {
  if (!redisClient) {
    redisClient = await redis.createClient();
      redisClient.on('connect', () => {
        console.log('Connected to Redis');
      });
     redisClient.on('error', (err) => {
        console.log('Redis Client Error', err);
      });
   console.log('Redis Client created');
    
  }
  
  return redisClient;
};

module.exports ={redisConnect}