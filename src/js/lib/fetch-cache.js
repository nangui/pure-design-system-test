/**
 * Cached fetch for /api/* and optional GET requests.
 * Uses Cache API when available, otherwise in-memory cache with TTL.
 * In-memory cache is wrapped in a Proxy to track hits/misses (see MDN Proxy).
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Cache
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy
 */

const DEFAULT_TTL_MS = 5 * 60 * 1000; // 5 minutes
const CACHE_NAME = "pds-dashboard-api-v1";

const memoryCacheBackend = new Map();
const memoryCacheStats = { hits: 0, misses: 0 };

/** Proxy over the in-memory cache: forwards get/set/clear, counts hits on valid get. */
const MEMORY_CACHE = new Proxy(memoryCacheBackend, {
  get(target, prop) {
    if (prop === "__stats__") return memoryCacheStats;
    if (prop === "get") {
      return function (key) {
        const entry = target.get(key);
        if (entry && typeof entry === "object" && entry.expires > Date.now()) memoryCacheStats.hits++;
        return entry;
      };
    }
    return Reflect.get(target, prop);
  },
});

/**
 * @param {string} url
 * @param {RequestInit} [options]
 * @param {{ ttl?: number, cache?: boolean }} [opts] - ttl in ms, cache=false to skip cache
 * @returns {Promise<Response>}
 */
export async function cachedFetch(url, options = {}, opts = {}) {
  const method = (options.method || "GET").toUpperCase();
  const skipCache = opts.cache === false || method !== "GET";
  const ttl = opts.ttl ?? DEFAULT_TTL_MS;

  if (skipCache) return fetch(url, options);

  const cacheKey = url;

  if (typeof caches !== "undefined") {
    try {
      const cache = await caches.open(CACHE_NAME);
      const cached = await cache.match(url);
      if (cached) {
        const date = cached.headers.get("x-cached-at");
        if (date && ttl > 0 && Date.now() - parseInt(date, 10) < ttl) return cached;
      }
      const res = await fetch(url, options);
      if (res.ok) {
        const clone = res.clone();
        const headers = new Headers(clone.headers);
        headers.set("x-cached-at", String(Date.now()));
        const body = await clone.blob();
        await cache.put(url, new Response(body, { status: clone.status, statusText: clone.statusText, headers }));
      }
      return res;
    } catch {
      return fetch(url, options);
    }
  }

  const entry = MEMORY_CACHE.get(cacheKey);
  if (entry && entry.expires > Date.now()) return entry.response.clone();
  memoryCacheStats.misses++;
  const response = await fetch(url, options);
  if (response.ok) {
    MEMORY_CACHE.set(cacheKey, {
      response: response.clone(),
      expires: Date.now() + ttl,
    });
  }
  return response;
}

/** Return in-memory cache stats (hits/misses). Only meaningful when Cache API is not used. */
export function getCacheStats() {
  return { ...memoryCacheStats };
}

/** Clear all cached entries (Cache API + memory) and reset stats. */
export async function clearFetchCache() {
  MEMORY_CACHE.clear();
  memoryCacheStats.hits = 0;
  memoryCacheStats.misses = 0;
  if (typeof caches !== "undefined") {
    try {
      await caches.delete(CACHE_NAME);
    } catch {}
  }
}
