const cache = new Map()

/**
 * In-memory cache middleware.
 * The full URL (path + query string) is included in the cache key so that
 * requests with different query params are cached independently.
 * @param {string} keyPrefix - Prefix used to group and invalidate related entries.
 * @param {number} ttl       - Time to live in seconds.
 */
export const cacheMiddleware = (keyPrefix, ttl) => (req, res, next) => {
  if (req.method !== 'GET') return next()

  const cacheKey = `${keyPrefix}:${req.originalUrl}`
  const entry = cache.get(cacheKey)
  if (entry && Date.now() - entry.timestamp < ttl * 1000) {
    return res.json(entry.data)
  }

  const originalJson = res.json.bind(res)
  res.json = (data) => {
    cache.set(cacheKey, { data, timestamp: Date.now() })
    originalJson(data)
  }
  next()
}

/**
 * Invalidate all cached entries for a given prefix.
 * Call this in create/update/delete handlers.
 * @param {string} keyPrefix
 */
export const clearCache = (keyPrefix) => {
  for (const key of cache.keys()) {
    if (key.startsWith(`${keyPrefix}:`)) {
      cache.delete(key)
    }
  }
}
