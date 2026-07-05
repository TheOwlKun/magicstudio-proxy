const config = require('./config');

class RequestQueue {
  constructor(concurrency, maxQueueLimit) {
    this.concurrency = concurrency;
    this.maxQueueLimit = maxQueueLimit;
    this.active = 0;
    this.queue = [];
    this.counter = 0;
    this.completed = 0;
    this.failed = 0;
  }

  async add(fn) {
    if (this.queue.length >= this.maxQueueLimit) {
      throw new Error('Queue is full. Please try again later.');
    }
    
    const ticket = ++this.counter;
    if (this.active >= this.concurrency) {
      await new Promise(resolve => this.queue.push({ resolve, ticket }));
    }
    this.active++;
    try {
      const result = await fn(ticket);
      this.completed++;
      return result;
    } catch (e) {
      this.failed++;
      throw e;
    } finally {
      this.active--;
      if (this.queue.length > 0) {
        const next = this.queue.shift();
        next.resolve();
      }
    }
  }
  
  get pending() { 
    return this.queue.length; 
  }
}

const imageQueue = new RequestQueue(config.concurrentLimit, config.maxQueueLimit);

module.exports = { RequestQueue, imageQueue };
