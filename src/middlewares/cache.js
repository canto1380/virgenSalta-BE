const cache = new Map()

/**
 * In-memory cache middleware.
 * @param {string} key   - Unique cache key for this endpoint.
 * @param {number} ttl   - Time to live in seconds.
 */
export const cacheMiddleware = (key, ttl) => (req, res, next) => {
  if (req.method !== 'GET') return next()

  const entry = cache.get(key)
  if (entry && Date.now() - entry.timestamp < ttl * 1000) {
    return res.json(entry.data)
  }

  const originalJson = res.json.bind(res)
  res.json = (data) => {
    cache.set(key, { data, timestamp: Date.now() })
    originalJson(data)
  }
  next()
}

/**
 * Invalidate a cached key. Call this in create/update/delete handlers.
 * @param {string} key
 */
export const clearCache = (key) => {
  cache.delete(key)
}
