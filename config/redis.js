const redis = require('redis');
require('dotenv').config();

const redisClient = redis.createClient({
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    }
});

// Handle events
redisClient.on('connect', () => console.log('Redis connected successfully'));
redisClient.on('error', (err) => console.error('Redis Client Error', err));

// Connect to Redis
(async () => {
    await redisClient.connect();
})();

// Export client
module.exports = redisClient;
