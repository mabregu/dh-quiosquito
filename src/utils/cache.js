// cache redis
const redis = require('redis');

const redisClient = redis.createClient({ url: process.env.REDIS_URL });

redisClient.on('error', (err) => {
    console.log('Redis error: ', err);
});

redisClient.on('connect', () => {
    console.log('Redis client connected');
});

redisClient.on('end', () => {
    console.log('Redis client disconnected');
});

redisClient.connect();

const cache = {
    get: async (key) => {
        const value = await redisClient.get(key);
        
        if (!value) return null;
        
        return JSON.parse(value);
    },
    set: (key, value) => {
        redisClient.set(key, JSON.stringify(value));
    },
    del: (key) => {
        redisClient.del(key);
    },
    flush: () => {
        redisClient.flushdb();
    }
};

module.exports = cache;