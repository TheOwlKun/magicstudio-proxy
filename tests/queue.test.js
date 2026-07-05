const { RequestQueue } = require('../src/queue');

describe('RequestQueue', () => {
  it('should process a function successfully', async () => {
    const queue = new RequestQueue(2, 10);
    const mockFn = jest.fn().mockResolvedValue('success');
    
    const result = await queue.add(mockFn);
    
    expect(result).toBe('success');
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(queue.completed).toBe(1);
  });

  it('should reject when max queue limit is reached', async () => {
    const queue = new RequestQueue(1, 1);
    
    // Active (starts immediately)
    queue.add(() => new Promise(resolve => setTimeout(resolve, 100)));
    // Queued (pending queue size becomes 1)
    queue.add(() => new Promise(resolve => setTimeout(resolve, 100)));
    
    // Add a 3rd one to exceed the pending limit
    await expect(queue.add(async () => 'fail')).rejects.toThrow('Queue is full. Please try again later.');
  });
});
