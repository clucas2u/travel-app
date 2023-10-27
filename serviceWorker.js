self.addEventListener('install', (event) => {
    // Perform install steps
  });
  
  self.addEventListener('fetch', (event) => {
    // Handle fetch events
  });
  const CACHE_NAME = 'travel-app-cache';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles/main.css',
  '/script/main.js',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});
