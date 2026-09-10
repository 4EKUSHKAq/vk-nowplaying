let cache = {
  text: "⏳ Загружаю...",
  time: 0
};

// Не спрашиваем VK слишком часто
const CACHE_TIME = 30000;

export function getCache() {
  return cache;
}

export function setCache(text) {
  cache = {
    text,
    time: Date.now()
  };
}

export function isCacheValid() {
  return Date.now() - cache.time < CACHE_TIME;
}
