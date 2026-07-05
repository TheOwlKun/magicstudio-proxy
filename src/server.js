const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const config = require('./config');
const logger = require('./logger');
const { router } = require('./routes');

const app = express();
app.use(express.json());

app.use(helmet());
app.use(cors());

if (!config.clientId) {
  logger.warn("CLIENT_ID is not set in environment variables. The API may not function correctly.");
}

const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, 
  max: config.rateLimitPerMinute,
  message: { error: { message: 'Too many requests from this IP, please try again after a minute' } },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/v1/', apiLimiter);
app.use('/', router);

if (require.main === module) {
  app.listen(config.port, () => {
    logger.info(`Server running on ${config.port}`);
  });
}

module.exports = app;
