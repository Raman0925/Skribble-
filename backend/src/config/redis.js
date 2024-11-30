const redis = require('redis');
let redisClient = null;

const redisConnect = () => {
  if (!redisClient) {
    redisClient = redis.createClient();
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