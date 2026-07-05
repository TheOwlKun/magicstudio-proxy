require('dotenv').config();

module.exports = {
  port: process.env.PORT,
  apiKey: process.env.API_KEY,
  clientId: process.env.CLIENT_ID,
  concurrentLimit: parseInt(process.env.CONCURRENT_LIMIT),
  maxQueueLimit: parseInt(process.env.MAX_QUEUE_LIMIT),
  rateLimitPerMinute: parseInt(process.env.RATE_LIMIT_PER_MINUTE)
};
