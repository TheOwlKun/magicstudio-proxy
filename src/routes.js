const express = require('express');
const axios = require('axios');
const FormData = require('form-data');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');
const config = require('./config');
const logger = require('./logger');
const { imageQueue } = require('./queue');

const router = express.Router();

const GENERATED_DIR = path.join(__dirname, '..', 'generated');
if (!fs.existsSync(GENERATED_DIR)) fs.mkdirSync(GENERATED_DIR, { recursive: true });

async function saveImageToDisk(buffer) {
  const filename = `img_${Date.now()}_${Math.random().toString(36).substring(7)}.png`;
  const filepath = path.join(GENERATED_DIR, filename);
  try {
    await fs.promises.writeFile(filepath, buffer);
    const files = await fs.promises.readdir(GENERATED_DIR);
    const filesWithStats = await Promise.all(
      files.map(async f => {
        const stat = await fs.promises.stat(path.join(GENERATED_DIR, f));
        return { name: f, time: stat.mtime.getTime() };
      })
    );
    filesWithStats.sort((a, b) => b.time - a.time);
    if (filesWithStats.length > 10) {
      const toDelete = filesWithStats.slice(10);
      await Promise.all(toDelete.map(f => fs.promises.unlink(path.join(GENERATED_DIR, f.name)).catch(() => {})));
    }
  } catch (e) { 
    logger.error(`Cleanup error: ${e.message}`); 
  }
  return filename;
}

async function generateImage(prompt) {
  const formData = new FormData();
  formData.append('prompt', prompt);
  formData.append('output_format', 'bytes');
  formData.append('user_profile_id', 'null');
  formData.append('anonymous_user_id', uuidv4());
  formData.append('request_timestamp', (Date.now() / 1000).toFixed(3));
  formData.append('user_is_subscribed', 'false');
  formData.append('client_id', config.clientId);

  try {
    const res = await axios.post('https://ai-api.magicstudio.com/api/ai-art-generator', formData, {
      headers: {
        ...formData.getHeaders(),
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'origin': 'https://magicstudio.com',
        'referer': 'https://magicstudio.com/'
      },
      responseType: 'arraybuffer', 
      timeout: 120000
    });
    return Buffer.from(res.data, 'binary').toString('base64');
  } catch (e) { 
    throw new Error(e.message); 
  }
}

const authenticateAPIKey = (req, res, next) => {
  if (!config.apiKey) return next();
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ') || auth.substring(7) !== config.apiKey) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
};

router.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    uptime: process.uptime(), 
    queue: { active: imageQueue.active, pending: imageQueue.pending } 
  });
});

router.get('/v1/queue', (req, res) => {
  res.json({ 
    active: imageQueue.active, 
    pending: imageQueue.pending, 
    limit: imageQueue.concurrency 
  });
});

router.get('/v1/models', authenticateAPIKey, (req, res) => {
  res.json({ object: 'list', data: [{ id: 'flux-lora', object: 'model' }] });
});

router.post('/v1/images/generations', authenticateAPIKey, async (req, res) => {
  try {
    const { prompt, n = 1, response_format = 'b64_json' } = req.body;
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'IP';

    if (!prompt) return res.status(400).json({ error: { message: 'Prompt required' } });

    logger.info(`API Request from IP: ${ip} | Queue: ${imageQueue.pending} pending`);

    const images = [];
    const count = Math.min(n, 10);

    for (let i = 0; i < count; i++) {
      let imageData;
      try {
        imageData = await imageQueue.add(() => generateImage(prompt));
      } catch (err) {
        if (err.message === 'Queue is full. Please try again later.') {
          return res.status(429).json({ error: { message: err.message } });
        }
        throw err;
      }
      
      await saveImageToDisk(Buffer.from(imageData, 'base64'));
      images.push(response_format === 'url' ? { url: `data:image/png;base64,${imageData}` } : { b64_json: imageData });
    }

    res.json({ created: Math.floor(Date.now() / 1000), data: images });
  } catch (error) {
    logger.error(`API Error: ${error.message}`);
    res.status(500).json({ error: { message: error.message } });
  }
});

module.exports = { router, generateImage, saveImageToDisk };
